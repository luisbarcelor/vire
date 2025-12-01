namespace Vire.ApiServer.Domain.Users;

public class User
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public required string Name { get; init; }
    public required string LastName { get; init; }
    public required string Username { get; init; }

    public User() { }

    public User(string name, string lastName, string username)
    {
        Name = name;
        LastName = lastName;
        Username = username;
    }
}
