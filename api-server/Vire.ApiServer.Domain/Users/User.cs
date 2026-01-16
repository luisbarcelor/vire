using System.Diagnostics.CodeAnalysis;

namespace Vire.ApiServer.Domain.Users;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
    public required string LastName { get; set; }
    public required string Username { get; set; }

    public User() { }

    [SetsRequiredMembers]
    public User(string name, string lastName, string username)
    {
        Name = name;
        LastName = lastName;
        Username = username;
    }
}
