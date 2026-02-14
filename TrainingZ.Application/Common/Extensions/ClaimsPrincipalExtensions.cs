using System.Security.Claims;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Common.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static Guid GetId(this ClaimsPrincipal claimsPrincipal)
    {
        return Guid.Parse(claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
    }

    public static string GetRole(this ClaimsPrincipal claimsPrincipal)
    {
        return claimsPrincipal.FindFirst(ClaimTypes.Role)?.Value!;
    }
}
