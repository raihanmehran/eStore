using API.Data;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly DataContext _context;

        public ProductsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async ValueTask<ActionResult<List<Product>>> GetProducts(
            string orderBy,
            string searchTerm,
            string brands,
            string types
        )
        {
            var query = _context.Products
                .Sort(orderBy: orderBy)
                .Search(searchTerm: searchTerm)
                .Filter(brands: brands, types: types)
                .AsQueryable();

            var products = await query.ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async ValueTask<ActionResult<Product>> GetProdctById(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }
    }
}