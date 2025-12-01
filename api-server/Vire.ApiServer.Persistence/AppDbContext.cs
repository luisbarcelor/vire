using Microsoft.EntityFrameworkCore;
using Vire.ApiServer.Domain.Users;

namespace Vire.ApiServer.Persistence;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
}
