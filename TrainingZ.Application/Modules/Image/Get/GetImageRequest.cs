namespace TrainingZ.Application.Modules.Image.Get;

public class GetImageRequest
{
    [QueryParam]
    public Guid ImageId { get; set; }
}
