namespace TrainingZ.Domain.Interfaces;

public interface IAppUser
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public Guid? ProfileImageId { get; set; }
}
