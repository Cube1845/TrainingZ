using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrainingZ.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UserInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserInfoId",
                table: "InvitationDatas",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "UserInfos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Goals = table.Column<string>(type: "text", nullable: false),
                    SleepDiet = table.Column<string>(type: "text", nullable: false),
                    Activity = table.Column<string>(type: "text", nullable: false),
                    Injuries = table.Column<string>(type: "text", nullable: false),
                    TimeAvaiable = table.Column<string>(type: "text", nullable: false),
                    Other = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserInfos", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InvitationDatas_UserInfoId",
                table: "InvitationDatas",
                column: "UserInfoId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InvitationDatas_UserInfos_UserInfoId",
                table: "InvitationDatas",
                column: "UserInfoId",
                principalTable: "UserInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvitationDatas_UserInfos_UserInfoId",
                table: "InvitationDatas");

            migrationBuilder.DropTable(
                name: "UserInfos");

            migrationBuilder.DropIndex(
                name: "IX_InvitationDatas_UserInfoId",
                table: "InvitationDatas");

            migrationBuilder.DropColumn(
                name: "UserInfoId",
                table: "InvitationDatas");
        }
    }
}
