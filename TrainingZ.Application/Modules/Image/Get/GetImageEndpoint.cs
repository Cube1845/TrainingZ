using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Image.Get;

public class GetImageEndpoint(IImageService imageService) : Endpoint<GetImageRequest>
{
    private readonly IImageService _imageService = imageService;

    public override void Configure()
    {
        Get("image");
        Roles(Role.Coach.ToString(), Role.User.ToString());
    }

    public override async Task HandleAsync(GetImageRequest req, CancellationToken ct)
    {
        var image = await _imageService.GetImage(req.ImageId, ct);

        if (image == null)
        {
            await SendNotFoundAsync(ct);
            return;
        }

        await SendBytesAsync(image.Data, image.ContentType, cancellation: ct);
    }
}
