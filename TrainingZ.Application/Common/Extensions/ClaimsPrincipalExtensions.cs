using System.Security.Claims;

namespace TrainingZ.Application.Common.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static Guid GetId(this ClaimsPrincipal claimsPrincipal)
    {
        return Guid.Parse(claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
    }
}
