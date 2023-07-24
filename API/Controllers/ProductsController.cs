using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
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
        public async ValueTask<ActionResult<PaginatedList<Product>>> GetProducts(
            [FromQuery] ProductParams productParams
        )
        {
            var query = _context.Products
                .Sort(orderBy: productParams.OrderBy)
                .Search(searchTerm: productParams.SearchTerm)
                .Filter(brands: productParams.Brands,
                    types: productParams.Types)
                .AsQueryable();

            var products = await PaginatedList<Product>.ToPaginatedList(
                query: query,
                pageNumber: productParams.PageNumber,
                pageSize: productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            return products;
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