using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrainingZ.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EntitesFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_InvitationDatas_Code",
                table: "InvitationDatas");

            migrationBuilder.DropIndex(
                name: "IX_CoachingDatas_CoachId",
                table: "CoachingDatas");

            migrationBuilder.CreateIndex(
                name: "IX_InvitationDatas_Code",
                table: "InvitationDatas",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_CoachingDatas_CoachId",
                table: "CoachingDatas",
                column: "CoachId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_InvitationDatas_Code",
                table: "InvitationDatas");

            migrationBuilder.DropIndex(
                name: "IX_CoachingDatas_CoachId",
                table: "CoachingDatas");

            migrationBuilder.CreateIndex(
                name: "IX_InvitationDatas_Code",
                table: "InvitationDatas",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CoachingDatas_CoachId",
                table: "CoachingDatas",
                column: "CoachId",
                unique: true);
        }
    }
}
