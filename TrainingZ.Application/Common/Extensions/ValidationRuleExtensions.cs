using FluentValidation;
using Microsoft.AspNetCore.Http;
using SkiaSharp;

namespace TrainingZ.Application.Common.Extensions;

public static class ValidationRuleExtensions
{
    private static readonly int MaxImageSize = 1440;

    public static IRuleBuilderOptions<T, Guid> MustBeCorrectGuid<T>(this IRuleBuilder<T, Guid> ruleBuilder)
    {
        return ruleBuilder.Must(guid => guid != Guid.Empty).WithMessage("Incorrect id");
    }

    public static IRuleBuilderOptions<T, IFormFile?> MustBeCorrectImageFile<T>(this IRuleBuilder<T, IFormFile?> ruleBuilder)
    {
        return ruleBuilder.Must(imagefile =>
            imagefile == null ||
            IsFileCorrectImage(imagefile)
        ).WithMessage("Incorrect image");
    }

    private static bool IsFileCorrectImage(IFormFile file)
    {
        SKBitmap? bitMap;

        using var stream = file.OpenReadStream();
        using var skStream = new SKManagedStream(stream);

        bitMap = SKBitmap.Decode(skStream);

        if (bitMap == null)
        {
            return false;
        }

        if (bitMap.Width > MaxImageSize || bitMap.Height > MaxImageSize)
        {
            return false;
        }

        return true;
    }
}
