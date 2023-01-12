using BookAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookAPI;

public class AppContext : DbContext
{
    public AppContext(DbContextOptions<AppContext> options): base(options)
    {
    }

    public DbSet<Book> Books { get; set; } = null!;
}