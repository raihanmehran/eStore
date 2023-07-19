using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly DataContext _context;

        public BasketController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async ValueTask<ActionResult<Basket>> GetBasket()
        {
            Basket basket = await RetrieveBasket();

            if (basket == null) return NotFound(basket);

            return basket;
        }

        [HttpPost]
        public async ValueTask<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();

            if (basket == null) basket = CreateBasket();

            var product = await _context.Products.FindAsync(productId);

            if (product == null) return NotFound();

            basket.AddItem(product: product, quantity: quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return StatusCode(201);

            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        [HttpDelete]
        public async ValueTask<ActionResult> RemoveItemFromBasket(int productId, int quantity)
        {
            return StatusCode(0);
        }

        private async ValueTask<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                            .Include(x => x.Items)
                            .ThenInclude(p => p.Product)
                            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);

            return basket;
        }
    }
}