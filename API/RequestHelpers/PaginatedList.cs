using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers
{
    public class PaginatedList<T> : List<T>
    {
        public MetaData MetaData { get; set; }

        public PaginatedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            MetaData = new MetaData
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)pageSize)
            };

            AddRange(items);
        }

        public static async Task<PaginatedList<T>> ToPaginatedList(
            IQueryable<T> query, int pageNumber, int pageSize)
        {
            var count = await query.CountAsync();

            var items = await query.Skip((pageNumber - 1) * pageSize)
                .Take(pageSize).ToListAsync();

            return new PaginatedList<T>(
                items: items,
                count: count,
                pageNumber: pageNumber,
                pageSize: pageSize);
        }


    }
}