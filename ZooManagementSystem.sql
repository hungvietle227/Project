USE [master]
GO
/****** Object:  Database [ZooManagementTest]    Script Date: 11/17/2023 2:02:04 AM ******/
CREATE DATABASE [ZooManagementTest]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ZooManagementTest', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.TRIEUVI\MSSQL\DATA\ZooManagementTest.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ZooManagementTest_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.TRIEUVI\MSSQL\DATA\ZooManagementTest_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [ZooManagementTest] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ZooManagementTest].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ZooManagementTest] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ZooManagementTest] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ZooManagementTest] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ZooManagementTest] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ZooManagementTest] SET ARITHABORT OFF 
GO
ALTER DATABASE [ZooManagementTest] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ZooManagementTest] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ZooManagementTest] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ZooManagementTest] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ZooManagementTest] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ZooManagementTest] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ZooManagementTest] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ZooManagementTest] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ZooManagementTest] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ZooManagementTest] SET  ENABLE_BROKER 
GO
ALTER DATABASE [ZooManagementTest] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ZooManagementTest] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ZooManagementTest] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ZooManagementTest] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ZooManagementTest] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ZooManagementTest] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ZooManagementTest] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ZooManagementTest] SET RECOVERY FULL 
GO
ALTER DATABASE [ZooManagementTest] SET  MULTI_USER 
GO
ALTER DATABASE [ZooManagementTest] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ZooManagementTest] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ZooManagementTest] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ZooManagementTest] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ZooManagementTest] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'ZooManagementTest', N'ON'
GO
ALTER DATABASE [ZooManagementTest] SET QUERY_STORE = OFF
GO
USE [ZooManagementTest]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [ZooManagementTest]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 11/17/2023 2:02:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AnimalCages]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AnimalCages](
	[AnimalId] [nvarchar](6) NOT NULL,
	[CageId] [nvarchar](5) NOT NULL,
	[EntryCageDate] [datetime2](7) NOT NULL,
	[OutCageDate] [datetime2](7) NULL,
 CONSTRAINT [PK_AnimalCages] PRIMARY KEY CLUSTERED 
(
	[AnimalId] ASC,
	[CageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AnimalMeals]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AnimalMeals](
	[MealId] [nvarchar](6) NOT NULL,
	[AnimalId] [nvarchar](6) NOT NULL,
	[StartEat] [datetime2](7) NOT NULL,
	[EndEat] [datetime2](7) NULL,
 CONSTRAINT [PK_AnimalMeals] PRIMARY KEY CLUSTERED 
(
	[AnimalId] ASC,
	[MealId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Animals]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Animals](
	[AnimalId] [nvarchar](6) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[Sex] [bit] NOT NULL,
	[Region] [nvarchar](30) NOT NULL,
	[HealthCheck] [nvarchar](max) NOT NULL,
	[Birthday] [datetime2](7) NOT NULL,
	[Status] [bit] NOT NULL,
	[Rarity] [bit] NOT NULL,
	[AnimalImage] [nvarchar](max) NULL,
	[SpeciesId] [nvarchar](6) NOT NULL,
 CONSTRAINT [PK_Animals] PRIMARY KEY CLUSTERED 
(
	[AnimalId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AnimalSchedules]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AnimalSchedules](
	[AnimalId] [nvarchar](6) NOT NULL,
	[ScheduleId] [nvarchar](6) NOT NULL,
	[Time] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](50) NOT NULL,
	[IsDone] [bit] NOT NULL,
 CONSTRAINT [PK_AnimalSchedules] PRIMARY KEY CLUSTERED 
(
	[ScheduleId] ASC,
	[AnimalId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AnimalSpecies]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AnimalSpecies](
	[SpeciesId] [nvarchar](6) NOT NULL,
	[SpeciesName] [nvarchar](30) NOT NULL,
 CONSTRAINT [PK_AnimalSpecies] PRIMARY KEY CLUSTERED 
(
	[SpeciesId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AnimalTrainers]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AnimalTrainers](
	[UserId] [nvarchar](6) NOT NULL,
	[AnimalId] [nvarchar](6) NOT NULL,
	[StartTrainDate] [datetime2](7) NOT NULL,
	[EndTrainDate] [datetime2](7) NULL,
 CONSTRAINT [PK_AnimalTrainers] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[AnimalId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Areas]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Areas](
	[AreaId] [nvarchar](6) NOT NULL,
	[AreaName] [nvarchar](1) NOT NULL,
	[Description] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Areas] PRIMARY KEY CLUSTERED 
(
	[AreaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cages]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cages](
	[CId] [nvarchar](5) NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
	[MaxCapacity] [int] NOT NULL,
	[AnimalQuantity] [int] NOT NULL,
	[AreaId] [nvarchar](6) NOT NULL,
 CONSTRAINT [PK_Cages] PRIMARY KEY CLUSTERED 
(
	[CId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ExperienceDetails]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExperienceDetails](
	[UserId] [nvarchar](6) NOT NULL,
	[ExperienceId] [nvarchar](6) NOT NULL,
	[Company] [nvarchar](30) NOT NULL,
 CONSTRAINT [PK_ExperienceDetails] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[ExperienceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FoodCategories]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FoodCategories](
	[CategoryId] [nvarchar](6) NOT NULL,
	[CategoryName] [nvarchar](30) NOT NULL,
 CONSTRAINT [PK_FoodCategories] PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FoodMeals]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FoodMeals](
	[MealId] [nvarchar](6) NOT NULL,
	[FoodId] [nvarchar](6) NOT NULL,
	[Quantity] [float] NOT NULL,
	[Unit] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_FoodMeals] PRIMARY KEY CLUSTERED 
(
	[FoodId] ASC,
	[MealId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Foods]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Foods](
	[FoodId] [nvarchar](6) NOT NULL,
	[FName] [nvarchar](30) NOT NULL,
	[Quantity] [float] NOT NULL,
	[Unit] [nvarchar](10) NOT NULL,
	[ImportDate] [datetime2](7) NOT NULL,
	[ExpiredDate] [datetime2](7) NOT NULL,
	[CategoryId] [nvarchar](6) NOT NULL,
 CONSTRAINT [PK_Foods] PRIMARY KEY CLUSTERED 
(
	[FoodId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Meals]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Meals](
	[MealId] [nvarchar](6) NOT NULL,
	[MealName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Meals] PRIMARY KEY CLUSTERED 
(
	[MealId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[News]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[News](
	[NewsId] [nvarchar](6) NOT NULL,
	[ReleaseDate] [datetime2](7) NOT NULL,
	[NewsTitle] [nvarchar](30) NOT NULL,
	[NewsContent] [nvarchar](max) NOT NULL,
	[NewsImage] [nvarchar](max) NULL,
	[Checked] [bit] NOT NULL,
	[Status] [bit] NOT NULL,
	[UserId] [nvarchar](6) NOT NULL,
 CONSTRAINT [PK_News] PRIMARY KEY CLUSTERED 
(
	[NewsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderId] [nvarchar](6) NOT NULL,
	[Email] [nvarchar](30) NOT NULL,
	[FullName] [nvarchar](50) NOT NULL,
	[PhoneNumber] [nvarchar](10) NOT NULL,
	[TotalPrice] [float] NOT NULL,
	[TransactionId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderTickets]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderTickets](
	[OrderId] [nvarchar](6) NOT NULL,
	[TicketId] [nvarchar](6) NOT NULL,
	[TicketQuantity] [int] NOT NULL,
	[StartDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_OrderTickets] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC,
	[TicketId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reviews]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reviews](
	[ReviewId] [nvarchar](6) NOT NULL,
	[Email] [nvarchar](30) NOT NULL,
	[CompleteName] [nvarchar](30) NOT NULL,
	[Message] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Reviews] PRIMARY KEY CLUSTERED 
(
	[ReviewId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedules]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schedules](
	[ScheduleId] [nvarchar](6) NOT NULL,
	[ScheduleName] [nvarchar](30) NOT NULL,
	[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Schedules] PRIMARY KEY CLUSTERED 
(
	[ScheduleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tickets]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tickets](
	[TicketId] [nvarchar](6) NOT NULL,
	[Type] [nvarchar](50) NOT NULL,
	[Price] [float] NOT NULL,
 CONSTRAINT [PK_Tickets] PRIMARY KEY CLUSTERED 
(
	[TicketId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transactions]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transactions](
	[TransactionId] [nvarchar](450) NOT NULL,
	[PaymentMethod] [nvarchar](20) NOT NULL,
	[TransactionInfo] [nvarchar](50) NOT NULL,
	[TransactionDate] [datetime2](7) NOT NULL,
	[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Transactions] PRIMARY KEY CLUSTERED 
(
	[TransactionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [nvarchar](6) NOT NULL,
	[Email] [nvarchar](30) NOT NULL,
	[PasswordHash] [varbinary](max) NOT NULL,
	[PasswordSalt] [varbinary](max) NOT NULL,
	[Firstname] [nvarchar](10) NOT NULL,
	[Lastname] [nvarchar](10) NOT NULL,
	[Address] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](10) NOT NULL,
	[Sex] [bit] NOT NULL,
	[StartDate] [datetime2](7) NOT NULL,
	[EndDate] [datetime2](7) NULL,
	[Status] [bit] NOT NULL,
	[RefreshToken] [nvarchar](max) NULL,
	[ResetPassToken] [nvarchar](max) NULL,
	[ResetTokenExpires] [datetime2](7) NULL,
	[Role] [int] NOT NULL,
	[CountAnimal] [int] NOT NULL,
	[UserImage] [nvarchar](max) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkExperiences]    Script Date: 11/17/2023 2:02:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkExperiences](
	[ExperienceId] [nvarchar](6) NOT NULL,
	[Position] [nvarchar](30) NOT NULL,
 CONSTRAINT [PK_WorkExperiences] PRIMARY KEY CLUSTERED 
(
	[ExperienceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231111143207_Init', N'6.0.22')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231111144356_InitDB', N'6.0.22')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231111145013_Meal', N'6.0.22')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231112034551_initDB', N'6.0.22')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231115041906_InitDBb', N'6.0.22')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231116160712_Initii', N'6.0.22')
GO
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0001', N'A0001', CAST(N'2023-10-28T09:43:45.9655674' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0002', N'A0003', CAST(N'2023-10-28T09:45:37.8893697' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0003', N'B0004', CAST(N'2023-10-28T09:48:24.5908558' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0004', N'B0004', CAST(N'2023-10-28T09:52:40.9334638' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0005', N'B0004', CAST(N'2023-10-28T09:52:43.9774423' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0006', N'B0004', CAST(N'2023-10-28T09:53:03.2118900' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0007', N'B0004', CAST(N'2023-10-28T09:53:11.4894712' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0008', N'E0001', CAST(N'2023-10-28T09:58:24.2844201' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0009', N'E0001', CAST(N'2023-10-28T09:58:47.6376548' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0010', N'E0001', CAST(N'2023-10-28T09:58:55.0971396' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0011', N'E0004', CAST(N'2023-11-03T14:05:21.5338658' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0012', N'C0001', CAST(N'2023-11-04T01:12:42.3413451' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0013', N'C0001', CAST(N'2023-11-04T01:13:09.7556974' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0014', N'C0001', CAST(N'2023-11-04T01:13:12.9225813' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0015', N'A0001', CAST(N'2023-11-04T01:27:59.4610525' AS DateTime2), CAST(N'2023-11-07T01:27:59.4610525' AS DateTime2))
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0015', N'A0005', CAST(N'2023-11-07T01:27:59.4610525' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0016', N'A0001', CAST(N'2023-11-16T23:41:37.3750055' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0017', N'B0005', CAST(N'2023-11-16T23:46:49.2952222' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0018', N'B0005', CAST(N'2023-11-16T23:46:52.5646070' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0019', N'B0005', CAST(N'2023-11-16T23:46:53.4235929' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0020', N'B0005', CAST(N'2023-11-16T23:46:55.5768297' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0021', N'D0001', CAST(N'2023-11-16T23:52:45.8793663' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0022', N'D0001', CAST(N'2023-11-16T23:52:51.2947432' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0023', N'D0001', CAST(N'2023-11-16T23:52:53.4499744' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0024', N'D0001', CAST(N'2023-11-16T23:53:03.9328666' AS DateTime2), NULL)
INSERT [dbo].[AnimalCages] ([AnimalId], [CageId], [EntryCageDate], [OutCageDate]) VALUES (N'AN0025', N'E0003', CAST(N'2023-11-16T23:55:48.0609319' AS DateTime2), NULL)
GO
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0001', N'AN0001', CAST(N'2023-11-16T00:00:00.0000000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0007', N'AN0002', CAST(N'2023-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0004', N'AN0003', CAST(N'2019-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0004', N'AN0004', CAST(N'2019-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0004', N'AN0005', CAST(N'2019-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0004', N'AN0006', CAST(N'2019-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0004', N'AN0007', CAST(N'2019-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0009', N'AN0008', CAST(N'2023-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0010', N'AN0009', CAST(N'2023-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0010', N'AN0010', CAST(N'2023-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0013', N'AN0011', CAST(N'2019-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0012', N'AN0012', CAST(N'2023-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0012', N'AN0013', CAST(N'2023-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0012', N'AN0014', CAST(N'2023-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0002', N'AN0015', CAST(N'2023-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0002', N'AN0016', CAST(N'2020-11-16T16:36:21.0150000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0011', N'AN0017', CAST(N'2019-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0011', N'AN0018', CAST(N'2019-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0011', N'AN0019', CAST(N'2019-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0011', N'AN0020', CAST(N'2019-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0014', N'AN0021', CAST(N'2022-11-16T16:49:33.5540000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0014', N'AN0022', CAST(N'2022-11-16T16:49:33.5540000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0014', N'AN0023', CAST(N'2022-11-16T16:49:33.5540000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0014', N'AN0024', CAST(N'2022-11-16T16:49:33.5540000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AnimalMeals] ([MealId], [AnimalId], [StartEat], [EndEat]) VALUES (N'ME0015', N'AN0025', CAST(N'2023-11-16T16:49:33.5540000' AS DateTime2), CAST(N'2023-11-25T00:00:00.0000000' AS DateTime2))
GO
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0001', N'Africa Lion', N'A large wild animal of the cat family with yellowish-brown fur that lives in Africa', 1, N'Africa', N'Good', CAST(N'2023-05-28T02:40:20.5710000' AS DateTime2), 1, 1, N'
C:\fakepath\sutu.jpg', N'SA0002')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0002', N'Africa Leopard', N'A large wild cat that has yellow fur with black spots on it and lives in Africa', 1, N'Africa', N'Good', CAST(N'2023-07-22T02:40:20.5710000' AS DateTime2), 1, 1, N'
C:\fakepath\bao.jpg', N'SA0007')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0003', N'Monkey', N'An animal that lives in hot countries, has a long tail, and climbs trees', 1, N'Asia Pacific', N'Good', CAST(N'2017-01-22T02:40:20.5710000' AS DateTime2), 1, 1, N'
C:\fakepath\khi.jpg', N'SA0006')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0004', N'Monkey', N'An animal that lives in hot countries, has a long tail, and climbs trees', 1, N'Asia Pacific', N'Good', CAST(N'2017-01-22T02:40:20.5710000' AS DateTime2), 1, 1, N'
C:\fakepath\khi2.jpg', N'SA0006')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0005', N'Monkey', N'An animal that lives in hot countries, has a long tail, and climbs trees', 1, N'Middle East', N'Good', CAST(N'2017-01-22T02:40:20.5710000' AS DateTime2), 1, 1, N'
C:\fakepath\khiEdit.jpg', N'SA0006')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0006', N'Monkey', N'An animal that lives in hot countries, has a long tail, and climbs trees', 1, N'Asia Pacific', N'Good', CAST(N'2019-07-22T02:40:20.5710000' AS DateTime2), 1, 1, N'
C:\fakepath\khi.jpg', N'SA0006')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0007', N'Monkey', N'An animal that lives in hot countries, has a long tail, and climbs trees', 1, N'North America', N'Good', CAST(N'2012-07-22T02:40:20.5710000' AS DateTime2), 1, 1, N'
C:\fakepath\khi2.jpg', N'SA0006')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0008', N'Crocodile', N'A large reptile with a hard skin that lives in and near rivers and lakes in hot, wet parts of the world', 1, N'Europe', N'Good', CAST(N'2022-07-22T02:40:20.5710000' AS DateTime2), 1, 1, N'
C:\fakepath\casau.jpg', N'SA0008')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0009', N'Crocodile', N'A large reptile with a hard skin that lives in and near rivers and lakes in hot, wet parts of the world', 1, N'Europe', N'Good', CAST(N'2020-07-22T02:40:20.5710000' AS DateTime2), 1, 1, N'
C:\fakepath\casau80x80.jpeg', N'SA0008')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0010', N'Crocodile', N'A large reptile with a hard skin that lives in and near rivers and lakes in hot, wet parts of the world', 1, N'Europe', N'Good', CAST(N'2018-07-22T02:40:20.5710000' AS DateTime2), 1, 1, N'
C:\fakepath\casau.jpg', N'SA0008')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0011', N'Snake', N'Snakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes', 1, N'North America', N'Good', CAST(N'2020-11-03T07:04:35.5180000' AS DateTime2), 1, 1, N'
C:\fakepath\tran.jpg', N'SA0001')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0012', N'Butterfly', N'A type of insect with large, often brightly coloured wings', 1, N'Asia', N'Good', CAST(N'2023-10-03T18:03:36.0640000' AS DateTime2), 1, 0, N'C:\fakepath\buom.jpg', N'SA0009')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0013', N'Butterfly', N'A type of insect with large, often brightly coloured wings', 1, N'Asia', N'Good', CAST(N'2023-10-03T18:03:36.0640000' AS DateTime2), 1, 0, N'C:\fakepath\buom.jpg', N'SA0009')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0014', N'Butterfly', N'A type of insect with large, often brightly coloured wings', 1, N'Asia', N'Good', CAST(N'2023-10-03T18:03:36.0640000' AS DateTime2), 1, 0, N'C:\fakepath\buom.jpg', N'SA0009')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0015', N'Lion', N'Lions are the second largest big cat species after tigers. They belong to the genus Panthera.', 1, N'Africa', N'Good', CAST(N'2019-11-03T18:23:29.1040000' AS DateTime2), 1, 0, N'C:\fakepath\sutu.jpg', N'SA0002')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0016', N'Africa Lion', N'A large wild animal of the cat family with yellowish-brown fur that lives in Africa', 1, N'Africa', N'Good', CAST(N'2018-11-16T16:36:21.0150000' AS DateTime2), 1, 1, N'C:\fakepath\sutu.jpg', N'SA0002')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0017', N'Elephant', N'A large wild animal of the cat family with yellowish-brown fur that lives in Africa', 1, N'Africa', N'Good', CAST(N'2023-07-16T16:36:21.0150000' AS DateTime2), 1, 1, N'C:\fakepath\voi.jpeg', N'SA0010')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0018', N'Elephant', N'A large wild animal of the cat family with yellowish-brown fur that lives in Africa', 1, N'Africa', N'Good', CAST(N'2023-07-16T16:36:21.0150000' AS DateTime2), 1, 1, N'C:\fakepath\voi.jpeg', N'SA0010')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0019', N'Elephant', N'A large wild animal of the cat family with yellowish-brown fur that lives in Africa', 1, N'Africa', N'Good', CAST(N'2023-07-16T16:36:21.0150000' AS DateTime2), 1, 1, N'C:\fakepath\voi.jpeg', N'SA0010')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0020', N'Elephant', N'A large wild animal of the cat family with yellowish-brown fur that lives in Africa', 1, N'Africa', N'Good', CAST(N'2023-07-16T16:36:21.0150000' AS DateTime2), 1, 1, N'C:\fakepath\voi.jpeg', N'SA0010')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0021', N'Flamingo', N'Flamingos or flamingoes are a type of wading bird in the family Phoenicopteridae, which is the only extant family in the order Phoenicopteriformes.', 1, N'Asia', N'Good', CAST(N'2020-11-16T16:49:33.5540000' AS DateTime2), 1, 1, N'C:\fakepath\honghac.png', N'SA0011')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0022', N'Flamingo', N'Flamingos or flamingoes are a type of wading bird in the family Phoenicopteridae, which is the only extant family in the order Phoenicopteriformes.', 1, N'Asia', N'Good', CAST(N'2020-11-16T16:49:33.5540000' AS DateTime2), 1, 1, N'C:\fakepath\honghac.png', N'SA0011')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0023', N'Flamingo', N'Flamingos or flamingoes are a type of wading bird in the family Phoenicopteridae, which is the only extant family in the order Phoenicopteriformes.', 1, N'Asia', N'Good', CAST(N'2020-11-16T16:49:33.5540000' AS DateTime2), 1, 1, N'C:\fakepath\honghac.png', N'SA0011')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0024', N'Flamingo', N'Flamingos or flamingoes are a type of wading bird in the family Phoenicopteridae, which is the only extant family in the order Phoenicopteriformes.', 1, N'Asia', N'Good', CAST(N'2020-11-16T16:49:33.5540000' AS DateTime2), 1, 1, N'C:\fakepath\honghac.png', N'SA0011')
INSERT [dbo].[Animals] ([AnimalId], [Name], [Description], [Sex], [Region], [HealthCheck], [Birthday], [Status], [Rarity], [AnimalImage], [SpeciesId]) VALUES (N'AN0025', N'Python', N'The Pythonidae, commonly known as pythons, are a family of nonvenomous snakes found in Africa, Asia, and Australia. Among its members are some of the largest snakes in the world.', 1, N'Asia', N'Good', CAST(N'2020-11-16T16:49:33.5540000' AS DateTime2), 1, 1, N'C:\fakepath\tran850.jpeg', N'SA0012')
GO
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0002', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0003', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0004', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0005', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0006', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0007', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0008', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0009', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0010', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0011', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0012', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0013', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0014', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0015', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0016', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0017', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0018', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0019', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0020', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0021', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0022', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0023', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0024', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0025', N'SC0001', N'8:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0002', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0003', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0004', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0005', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0006', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0007', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0008', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0009', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0010', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0011', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0012', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0013', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0014', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0015', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0016', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0017', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0018', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0019', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0020', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0021', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0022', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0023', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0024', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0025', N'SC0002', N'12:30', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0002', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0003', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0004', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0005', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0006', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0007', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0008', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0009', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0010', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0011', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0012', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0013', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0014', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0015', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0016', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0017', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0018', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0019', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0020', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0021', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0022', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0023', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0024', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
INSERT [dbo].[AnimalSchedules] ([AnimalId], [ScheduleId], [Time], [Description], [IsDone]) VALUES (N'AN0025', N'SC0003', N'18:00', N'Please feed in 1 hour from feed time', 0)
GO
INSERT [dbo].[AnimalSpecies] ([SpeciesId], [SpeciesName]) VALUES (N'SA0001', N'Snake')
INSERT [dbo].[AnimalSpecies] ([SpeciesId], [SpeciesName]) VALUES (N'SA0002', N'Lion')
INSERT [dbo].[AnimalSpecies] ([SpeciesId], [SpeciesName]) VALUES (N'SA0003', N'Bird')
INSERT [dbo].[AnimalSpecies] ([SpeciesId], [SpeciesName]) VALUES (N'SA0004', N'Tiger')
INSERT [dbo].[AnimalSpecies] ([SpeciesId], [SpeciesName]) VALUES (N'SA0005', N'Bear')
INSERT [dbo].[AnimalSpecies] ([SpeciesId], [SpeciesName]) VALUES (N'SA0006', N'Monkey')
INSERT [dbo].[AnimalSpecies] ([SpeciesId], [SpeciesName]) VALUES (N'SA0007', N'Leopard')
INSERT [dbo].[AnimalSpecies] ([SpeciesId], [SpeciesName]) VALUES (N'SA0008', N'Crocodile')
INSERT [dbo].[AnimalSpecies] ([SpeciesId], [SpeciesName]) VALUES (N'SA0009', N'Butterfly')
INSERT [dbo].[AnimalSpecies] ([SpeciesId], [SpeciesName]) VALUES (N'SA0010', N'Elephant')
INSERT [dbo].[AnimalSpecies] ([SpeciesId], [SpeciesName]) VALUES (N'SA0011', N'Flamingo')
INSERT [dbo].[AnimalSpecies] ([SpeciesId], [SpeciesName]) VALUES (N'SA0012', N'Python')
GO
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0001', N'AN0001', CAST(N'2023-10-28T09:43:45.9465219' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0001', N'AN0011', CAST(N'2023-11-03T14:05:21.5142358' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0001', N'AN0015', CAST(N'2023-11-04T01:27:59.4556669' AS DateTime2), CAST(N'2023-11-07T01:27:59.4610525' AS DateTime2))
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0002', N'AN0002', CAST(N'2023-10-28T09:45:37.8866215' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0002', N'AN0003', CAST(N'2023-10-28T09:48:24.5882142' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0002', N'AN0004', CAST(N'2023-10-28T09:52:40.9300896' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0002', N'AN0005', CAST(N'2023-10-28T09:52:43.9719423' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0002', N'AN0006', CAST(N'2023-10-28T09:53:03.2090220' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0002', N'AN0007', CAST(N'2023-10-28T09:53:11.4848106' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0002', N'AN0012', CAST(N'2023-11-04T01:12:42.3232311' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0002', N'AN0013', CAST(N'2023-11-04T01:13:09.7519245' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0002', N'AN0014', CAST(N'2023-11-04T01:13:12.9205911' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0003', N'AN0008', CAST(N'2023-10-28T09:58:24.2816913' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0003', N'AN0009', CAST(N'2023-10-28T09:58:47.6359099' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0003', N'AN0010', CAST(N'2023-10-28T09:58:55.0952696' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0004', N'AN0015', CAST(N'2023-11-07T01:27:59.4610525' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0014', N'AN0016', CAST(N'2023-11-16T23:41:37.3579252' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0015', N'AN0017', CAST(N'2023-11-16T23:46:49.2915494' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0015', N'AN0018', CAST(N'2023-11-16T23:46:52.5627589' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0015', N'AN0019', CAST(N'2023-11-16T23:46:53.4199082' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0015', N'AN0020', CAST(N'2023-11-16T23:46:55.5721839' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0017', N'AN0021', CAST(N'2023-11-16T23:52:45.8613344' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0017', N'AN0022', CAST(N'2023-11-16T23:52:51.2910648' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0017', N'AN0023', CAST(N'2023-11-16T23:52:53.4472213' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0017', N'AN0024', CAST(N'2023-11-16T23:53:03.9293379' AS DateTime2), NULL)
INSERT [dbo].[AnimalTrainers] ([UserId], [AnimalId], [StartTrainDate], [EndTrainDate]) VALUES (N'ZT0018', N'AN0025', CAST(N'2023-11-16T23:55:48.0569260' AS DateTime2), NULL)
GO
INSERT [dbo].[Areas] ([AreaId], [AreaName], [Description]) VALUES (N'AE0001', N'A', N'This is area for most of carnivore animals')
INSERT [dbo].[Areas] ([AreaId], [AreaName], [Description]) VALUES (N'AE0002', N'B', N'This is area for most of graminivore, monkey')
INSERT [dbo].[Areas] ([AreaId], [AreaName], [Description]) VALUES (N'AE0003', N'C', N'This is area for most of insect animals')
INSERT [dbo].[Areas] ([AreaId], [AreaName], [Description]) VALUES (N'AE0004', N'D', N'This is area for most of flying animals')
INSERT [dbo].[Areas] ([AreaId], [AreaName], [Description]) VALUES (N'AE0005', N'E', N'This is area for most of reptilian animals')
GO
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'A0001', N'Lion', 5, 2, N'AE0001')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'A0002', N'Tiger', 2, 0, N'AE0001')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'A0003', N'Leopard', 2, 1, N'AE0001')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'A0004', N'Puma', 5, 0, N'AE0001')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'A0005', N'Lion', 2, 0, N'AE0001')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'B0001', N'Goat', 20, 0, N'AE0002')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'B0002', N'Sheep', 20, 0, N'AE0002')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'B0003', N'Dear', 10, 0, N'AE0002')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'B0004', N'Monkey', 20, 5, N'AE0002')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'B0005', N'Elephant', 4, 4, N'AE0002')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'C0001', N'Butterfly', 20, 3, N'AE0003')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'D0001', N'Flamingo', 10, 4, N'AE0004')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'D0002', N'Hawk', 4, 0, N'AE0004')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'D0003', N'Peacock', 10, 0, N'AE0004')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'E0001', N'Crocodile', 10, 3, N'AE0005')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'E0002', N'Iguana', 5, 0, N'AE0005')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'E0003', N'Python', 2, 1, N'AE0005')
INSERT [dbo].[Cages] ([CId], [Name], [MaxCapacity], [AnimalQuantity], [AreaId]) VALUES (N'E0004', N'Snake', 2, 1, N'AE0005')
GO
INSERT [dbo].[FoodCategories] ([CategoryId], [CategoryName]) VALUES (N'FC0001', N'Fruit')
INSERT [dbo].[FoodCategories] ([CategoryId], [CategoryName]) VALUES (N'FC0002', N'Vegetable')
INSERT [dbo].[FoodCategories] ([CategoryId], [CategoryName]) VALUES (N'FC0003', N'Raw meet')
INSERT [dbo].[FoodCategories] ([CategoryId], [CategoryName]) VALUES (N'FC0004', N'Sea food')
GO
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0003', N'FD0001', 5, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0004', N'FD0001', 10, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0001', N'FD0002', 3, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0002', N'FD0002', 5, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0005', N'FD0002', 2, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0006', N'FD0002', 5, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0007', N'FD0002', 2, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0008', N'FD0002', 5, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0009', N'FD0002', 2, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0010', N'FD0002', 5, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0013', N'FD0002', 0.5, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0015', N'FD0002', 0.5, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0002', N'FD0003', 2, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0006', N'FD0003', 2, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0010', N'FD0003', 2, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0001', N'FD0004', 1, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0002', N'FD0004', 2, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0005', N'FD0004', 1, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0006', N'FD0004', 3, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0007', N'FD0004', 1, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0008', N'FD0004', 3, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0013', N'FD0004', 0.5, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0015', N'FD0004', 0.5, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0011', N'FD0005', 1, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0014', N'FD0005', 0.5, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0003', N'FD0007', 3, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0004', N'FD0007', 5, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0011', N'FD0008', 1, N'Kg')
INSERT [dbo].[FoodMeals] ([MealId], [FoodId], [Quantity], [Unit]) VALUES (N'ME0012', N'FD0009', 0.2, N'Kg')
GO
INSERT [dbo].[Foods] ([FoodId], [FName], [Quantity], [Unit], [ImportDate], [ExpiredDate], [CategoryId]) VALUES (N'FD0001', N'Banana', 5000, N'Kg', CAST(N'2023-10-26T12:56:21.2480000' AS DateTime2), CAST(N'2023-10-26T12:56:21.2480000' AS DateTime2), N'FC0001')
INSERT [dbo].[Foods] ([FoodId], [FName], [Quantity], [Unit], [ImportDate], [ExpiredDate], [CategoryId]) VALUES (N'FD0002', N'Pork', 5000, N'Kg', CAST(N'2023-10-31T14:21:12.0090000' AS DateTime2), CAST(N'2023-10-31T14:21:12.0090000' AS DateTime2), N'FC0003')
INSERT [dbo].[Foods] ([FoodId], [FName], [Quantity], [Unit], [ImportDate], [ExpiredDate], [CategoryId]) VALUES (N'FD0003', N'Mutton', 5000, N'Kg', CAST(N'2023-10-26T12:56:21.2480000' AS DateTime2), CAST(N'2023-11-26T12:56:21.2480000' AS DateTime2), N'FC0003')
INSERT [dbo].[Foods] ([FoodId], [FName], [Quantity], [Unit], [ImportDate], [ExpiredDate], [CategoryId]) VALUES (N'FD0004', N'Chicken', 1000, N'Kg', CAST(N'2023-11-10T12:56:21.2480000' AS DateTime2), CAST(N'2023-11-26T12:56:21.2480000' AS DateTime2), N'FC0003')
INSERT [dbo].[Foods] ([FoodId], [FName], [Quantity], [Unit], [ImportDate], [ExpiredDate], [CategoryId]) VALUES (N'FD0005', N'Cruciferous vegetables', 500, N'Kg', CAST(N'2023-10-26T12:56:21.2480000' AS DateTime2), CAST(N'2023-11-26T12:56:21.2480000' AS DateTime2), N'FC0002')
INSERT [dbo].[Foods] ([FoodId], [FName], [Quantity], [Unit], [ImportDate], [ExpiredDate], [CategoryId]) VALUES (N'FD0006', N'Fish', 500, N'Kg', CAST(N'2023-11-05T12:56:21.2480000' AS DateTime2), CAST(N'2023-11-26T12:56:21.2480000' AS DateTime2), N'FC0004')
INSERT [dbo].[Foods] ([FoodId], [FName], [Quantity], [Unit], [ImportDate], [ExpiredDate], [CategoryId]) VALUES (N'FD0007', N'Apple', 1000, N'Kg', CAST(N'2023-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-12-16T20:50:31.0250000' AS DateTime2), N'FC0001')
INSERT [dbo].[Foods] ([FoodId], [FName], [Quantity], [Unit], [ImportDate], [ExpiredDate], [CategoryId]) VALUES (N'FD0008', N'Sugarcane', 1000, N'Kg', CAST(N'2023-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2023-12-16T20:50:31.0250000' AS DateTime2), N'FC0001')
INSERT [dbo].[Foods] ([FoodId], [FName], [Quantity], [Unit], [ImportDate], [ExpiredDate], [CategoryId]) VALUES (N'FD0009', N'Flower', 500, N'Kg', CAST(N'2023-11-16T20:50:31.0250000' AS DateTime2), CAST(N'2024-02-16T20:50:31.0250000' AS DateTime2), N'FC0002')
GO
INSERT [dbo].[Meals] ([MealId], [MealName]) VALUES (N'ME0001', N'Meal for lions under 2 years old')
INSERT [dbo].[Meals] ([MealId], [MealName]) VALUES (N'ME0002', N'Meal for lion from 3 - 10')
INSERT [dbo].[Meals] ([MealId], [MealName]) VALUES (N'ME0003', N'Meal for monkey under 2 years old')
INSERT [dbo].[Meals] ([MealId], [MealName]) VALUES (N'ME0004', N'Meal for monkey older than 2 years old')
INSERT [dbo].[Meals] ([MealId], [MealName]) VALUES (N'ME0005', N'Meal for tiger under 2 years old')
INSERT [dbo].[Meals] ([MealId], [MealName]) VALUES (N'ME0006', N'Meal for tiger from 2-8')
INSERT [dbo].[Meals] ([MealId], [MealName]) VALUES (N'ME0007', N'Meal for leopard under 2 years old')
INSERT [dbo].[Meals] ([MealId], [MealName]) VALUES (N'ME0008', N'Meal for leopard from 2-8 years old')
INSERT [dbo].[Meals] ([MealId], [MealName]) VALUES (N'ME0009', N'Meal for crocodile under 6 months')
INSERT [dbo].[Meals] ([MealId], [MealName]) VALUES (N'ME0010', N'Meal for crocodile older than 6 months')
INSERT [dbo].[Meals] ([MealId], [MealName]) VALUES (N'ME0011', N'Meal for elephant under 6 months')
INSERT [dbo].[Meals] ([MealId], [MealName]) VALUES (N'ME0012', N'Meal for butterfly')
INSERT [dbo].[Meals] ([MealId], [MealName]) VALUES (N'ME0013', N'Meal for snake')
INSERT [dbo].[Meals] ([MealId], [MealName]) VALUES (N'ME0014', N'Meal for flamingo')
INSERT [dbo].[Meals] ([MealId], [MealName]) VALUES (N'ME0015', N'Meal for python')
GO
INSERT [dbo].[Schedules] ([ScheduleId], [ScheduleName], [Status]) VALUES (N'SC0001', N'Breakfast', 1)
INSERT [dbo].[Schedules] ([ScheduleId], [ScheduleName], [Status]) VALUES (N'SC0002', N'Lunch', 1)
INSERT [dbo].[Schedules] ([ScheduleId], [ScheduleName], [Status]) VALUES (N'SC0003', N'Dinner', 1)
INSERT [dbo].[Schedules] ([ScheduleId], [ScheduleName], [Status]) VALUES (N'SC0004', N'Train', 1)
INSERT [dbo].[Schedules] ([ScheduleId], [ScheduleName], [Status]) VALUES (N'SC0005', N'Health Check', 1)
GO
INSERT [dbo].[Tickets] ([TicketId], [Type], [Price]) VALUES (N'TK0001', N'Adult', 60000)
INSERT [dbo].[Tickets] ([TicketId], [Type], [Price]) VALUES (N'TK0002', N'Child', 30000)
GO
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0001', N'string', 0xFBE18663BF6B00FDE7324E3E6D758C7641A09B5064DC045EB00263551BA4FAD52397FA4C87B8AA6B8D98DE03546FEEF229B0EA011B67B3A7C77E10508C5B796F, 0xAE3FBD2A80B4283A8535385EBC070113236050983C2B59AA43347EAE131DEBA805399955120A3DE2D843E271117CB69D442D38BFDB3A19203720A4C992D4B84341BDB309B79DF00188AB01BC04F47573A77A7D0499C17540E4DCDA7EDF0FC5576D19A6BEF16ECCB682FD9C87233CD4926AFD2050CE0E8293C923D79E80467AEF, N'Pham', N'Hoang Tri', N'TPHCM', N'0985417542', 0, CAST(N'2023-11-15T12:05:23.6408125' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user6.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0002', N'staff@gmail.com', 0x0F079E10345A24DABE58DEEC53E2F332E39C80BB63A3174D149E04BCB401EF12CD3CF12548A6EAAB8F9CADCF27BDDC8A4FE6A38FA3539FC5D5D28D748B99D913, 0xAEB7C3BAB58D24D5962279BBB2EF6B9C23470C136ECE0DD112622D64DFB9B30A1BD3E42BEA8C06D58AE9C68BADC463F6B2B417BA656E36492AA057CB39826AC2AA78FB7FCF681866936494A7985AD5B8A843B0CDB460C45C7BE1D0482A97B85D806ED3651E7BB9753914F6A4465FBB826FE43B80C6474E9CF1C6C38E2442FAE8, N'Le', N'Hung', N'string', N'0872556321', 1, CAST(N'2023-11-16T10:37:17.1852825' AS DateTime2), CAST(N'2023-11-16T17:37:40.8359151' AS DateTime2), 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user5.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0003', N'staff1@gmail.com', 0xF3342B1E810D0FE3A8C852E8A73FC98DFDCB760CDC13ECE0829ECED7789322A9472B754DC2347498B603A7417471FFB923E476361604BC356181EBD1DB28B553, 0xA4D584D9F4C7E1E8EBB966FF46B5A460B8E9518C02415515F8CDE5F0978B04326B6C21383C2E92A56B53691713F6F24F35164B285B592D44F384118A0511F7D2E43FE754F35444C52BB4EF60537D1A76D394F518C007BE7D6EA56B0846C0928ACC290DE86F5C62CDE9BFC4BE0F62A2D86307505D19FD4E1720C6E2636AE31EE4, N'Le', N'Huy', N'Nguyễn Duy Trinh', N'1233445687', 1, CAST(N'2023-11-16T17:06:25.6744374' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user2.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0004', N'huy@gmail.com', 0xEE65E1BD094B3F2E7785456246AECD2FB513FDA2F75DF194AED3E5E287C757092D12E74E38B29AE86E4E3F6DD638754CCDE886FFE2D418FA8A912664F6106EE4, 0x743DC092C917AC66B0D54E30F396837F7AF8E693FFD1112E701E7DFDB58E1C9AB10F4546421328D2CB88528336B3AC46666DBF8A5F4F853507E5BA3FBF8C1DC12CA4D1B2737AEFA1434284D8FD13997D00E2DFCF138F63B3662949CCA1C7499FB6DAF0951C4383277A38DCB76DD2715B9D3909DC887373288CF76F3928383260, N'Le', N'Minh Huy', N'Quan 12, Viet Nam', N'0123456789', 1, CAST(N'2023-11-16T19:27:37.7328969' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0005', N'namnguyen@gmail.com', 0xDF482B15FFA4EC8ECDF79D8CCF27B45F0CD320C3343AE1A803715B82E756AA36BF0CD27B41DECF7A132B0934CB359573BE9F5ABA9D8C25C3DDA81FF74C4B2D53, 0x15E6AA1F3719F7570078B989722C1344C636E4C672497B9C474AF60015B6628E83B44D5792C6986A05A63FB82DE2FB21CEC5A9B6A00FE94ACA80E614579C90DAF6490D7B1FD9B3D46D01F390C06C832130241E552E8F21F563A81B87EB9B564DA0186BB3F71EBDC10CFDFBAD2C3B72DDD5146C1C8C8206B2EDEB5763D84D3D0E, N'Tran', N'Phuong Nam', N'Số 20 Đường Nguyễn Văn Linh, Quận 9', N'0912345678', 1, CAST(N'2023-11-16T19:33:25.1168495' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user3.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0006', N'phucnguyen@gmail.com', 0xC055AFDA78D1723175DE14066158BC51A44B9519BCE6D88C70C7C54FFA7E4651453B7DBF0192739EB873301816A4950F213550FA59E8B72C7B3D728DF562584D, 0x64B99F9876278F1F5D4D912F61DC02AA0948120E4C1AFB5C90F530C6BD48B581A3B642DC9870F340247169652DD31F4D055FFB930F7D746504299231A08A4119AD07F55D35B0897113BD04EDCB5ADFBA634653D1F4840BB7AD0E27D21E7CDE45D89E8B53580AA0FF0A9A6E3568B3BB298D3F7BF46F8E346886418035C0BA7CCF, N'Trieu', N'Viet Hung', N'Số 80 Đường Nguyễn Thị Định, Quận 2', N'0865432198', 0, CAST(N'2023-11-16T19:35:02.8145166' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user4.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0007', N'giabao@gmail.com', 0xF9BBB214A6D457C2E7C5DDD8DD9E722FCC7E4513AE99FAFD30DEA6CED2CA90B787D5FF8F4136E1D65A9FCFDE4EC5CE0E4A97A00E895BC00CF63A3EDEA0FA1B3A, 0xB9ABC18374CDC93FE95F27D6F5B34D44499C031B61BA3AE49A61865DC85A5F9FF603E92EE2C2D32701D8C486CE0D061705560B7D7338E1F5C8FAEB4E230FB94C754BA918497BE182E6378DDDE342DE29D63181303ADAEE51057101C32BA8D9F140D59AEA89BAF846C41118D3B2638663A64C70B7432A958EAFDA6E117212B65B, N'Ngo', N'Gia Bao', N'Số 20 Đường Nguyễn Văn Linh, Quận 9', N'0943216789', 1, CAST(N'2023-11-16T19:35:53.4824664' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0008', N'thuyngo@gmail.com', 0xDB2AAE9E4427201F060DE00B85D19B61AA7876A3F51D4DCD2FC70F0617F94CE740AD2E8DC27238E5E96E8E056C15359D859AC245E85F4FE45CE2F476EA7B1108, 0xEDE2D9677C85EC007BDA088788883695A155B9F978C5AE370EEFFFF970EEF14274E83876C13FA312F678EBCB571200AF15C6821CD01D0B542FEF23C766CDE000E2BF44E28198012F6DF25D8656CE8C7D75DE5020B843ABA9BA68CB736B57FBC2779D31365830D7A55107A6AB51C9F5802A2EA5087A3C227E03C269A3A77D92A7, N'Ngo', N'Minh Thuy', N'Số 80 Đường Nguyễn Thị Định, Quận 2', N'0887654321', 1, CAST(N'2023-11-16T19:36:49.1146967' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user2.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0009', N'nguyen@gmail.com', 0x75C3B7A7EA54F75F1838B2BE25366F0EB1759B2F10D3A1FD910BE408A97026DBBEB85D90E109520380D108A0C243701F155BC4E277050CDE580F8756C9C8B149, 0x38E5713F8E43B12B8D74275B20A61CA6E8A2824BA3658B9442EC9EFF9597E799B7EE45EA92FA9AFE65D6283E61B01BAC76CA886733172BED1C3B32BDE06A23499AA91BA925567739A85E5CA12F1ABB63849B6573F7BC2BE88D569BFC1153D96EC45E233315B5F37EC5C8FA8562FADC270E803BC9B4081C1F4E0A19B8DAFC5994, N'Nguyen', N'Xuan Thu', N'TPHCM', N'0976543210', 1, CAST(N'2023-11-16T19:37:59.7201503' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0010', N'abc@gmail.com', 0x85CB38C9EDDB030A4E92975D54ACB73115468805C3C75551D2CF4A5DD5684AA3ACE52E4EC16B5412623C7728312C90D357C0D79778F34160AE55F76CA9DAFB4F, 0x13DEC6EE621BA2F25929CCD7A6EB8D0E3D2E7E448D6B2DF75979DF0969FE6CAB99D4822C3368A31056FD3E2DA280F25F6CC4EDB5B0A4CAA943A67F63E8F6C51F0C504A3132ACB95BC57B1972585B26763B534F5131B6C2A929FF6286939464B1EFE9E0D68284C56F8D9D31F6EC13258EB603AFFFAE44CBF367D7DCDCD3AB07E0, N'Luu', N'Hoai Trinh', N'Quan 12, Viet Nam', N'0832165498', 0, CAST(N'2023-11-16T19:38:25.9919022' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user4.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0011', N'trungphan@gmail.com', 0x03247E0E4FEFF85D5B07AAEE606D84D1FF40F226BFC7B3348ADB624C5F209FE1CD09469F03B0AE6F75C4E1C5F5BCE22D172274083ADAD856041AB71DA105E9EE, 0x58BB09B29D1FBBED77EFE716EA1C7753E60CCC7C4C05CABFD71B49F1E813A63E1E307F050299E134DC001C273441BD9B4946F451AB7493968F6E1D504E1F67C18C032B8A732FE1E35ACDEC1571BF95C64F3D3249836A3569BB19DD0D3E6359F4EB7ADA03CA1E0FCA6D64516B6557B8E72D7D7053ACD5656B11C9A84B17859E4F, N'Phan', N'Tan Trung', N'Số 80 Đường Nguyễn Thị Định, Quận 2', N'0909876543', 1, CAST(N'2023-11-16T19:40:55.5819491' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user7.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0012', N'huynhphan@gmail.com', 0x347A4A0C17DB1540E56CDE5FD92B74F33B14349744DB9DB4DBC31B67839FB353CBE91D933F435CD11445450E1C5672AA0AAF6CACB1594AA34A5D8AAD593C9A7E, 0xABE9C930F8C4FCCE7BF03438339E149F67A111987D09166C4E882EB0FD79F967FC9BE7A20246819BF2C333E2DBBB0E18EAA2984CA4D3C8AB4D589B369B9D4141AED4FE22311A6198DCB2FE846D8A2952976E2F41B089D933328B1222C6925FC79741CF06EE40170D69BC694885ACAB5ED33B74C8CDE04D73F89A7CF45B9BAD43, N'Phan', N'Thi Huynh', N'TPHCM', N'0965432178', 1, CAST(N'2023-11-16T19:42:41.0955274' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user6.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0013', N'thuyendieu@gmail.com', 0x785CD3888697BD095683D955BA8B922502DA7C242A672EC59B8037E1FDAE7A1D41B1F317B1098B6AA99831090350BCE88F92D7FEACD316A00E4FC4801CEE2D24, 0xDFDA24AD8572C3F8CA81444A7161161E98C5B944A02FE736B9ABDB2D1FC48B179FA5FF9EE6EACBD29385606888A917B8DB7813BAC8A55AFFD90DCF83EC5D25154B8E9A129478644C8772A6A66DEEDF047095C367BC46B03274D1239197B79611E4F836306F1642340508E3BC4B02DB07E31EB81CC02336E8CB3F410402B5D9AD, N'Dieu', N'Du Thuyen', N'TPHCM', N'0898765432', 1, CAST(N'2023-11-16T19:43:48.3847903' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user8.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0014', N'trucmau@gmail.com', 0x8DC00126F9165C1DB77A1E21FEA5540117BC07DB27E599D411A84DD578FB580F0FC28480D11E8FFCAF7325EDC7C8BBE224665460FC805749623996ABA8B0CB7E, 0xBB01EBA9A42FA619A091C5C2CFBB08AE2B714A426043BF52B66DF202AF3835AF0C9F8C6432A63F03DE7F6EAD3352A794095F7F5A655CF27A9851CD0B0D383595D3E5C76DE402241BDE4E5CAE558307EF010BEFBB41A5A454FB9084B6250D57AE1160451529D826E10E90BE1FED86D0F366BAD039A0E425232B6CE8FBB250C0FD, N'Mau', N'Thanh Truc', N'Xã Phương Linh, Huyện Bạch Thông, Bắc cạn', N'0923456789', 0, CAST(N'2023-11-16T19:45:12.5379599' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user5.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0015', N'quocbao@gmail.com', 0x50EFD64851EEB85DB28058820BF39ED500C55A2EE623D022EEC97E3FA713D145AD7F5D30266BA070FB55F0EF129F7DA11B0E9A9C3CBB68272EBB8803B9D5BCF3, 0x7C0BC2CD02314027510F03A4145C9695C79EAA2384D320CF32767FC33434E46AF4DF1C342B0F02A02FDB934807F15245C94907688286B15BFBFCE833B804E5B658864F59076723946DEE046671C15AE8CD7659B4975787A760BA77087559EBAB81E9BE65812CCB5CBB5136621DB2DB803602458110244FDB02AF6B03343E730A, N'Quan', N'Bao Quoc', N'Xã Hua Nà, Huyện Than Uyên, Lai Châu', N'0954321678', 1, CAST(N'2023-11-16T19:46:00.8576740' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user7.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0016', N'tho@gmail.com', 0xB62179B9B7DDD7AB3E973D256446F885D6A15AFD8CABA1A7A9BCB30C3EF26E58EB8B079FD0AAA43CA5C82889DB593D63CF5473ECEFA711DF9740777737653F80, 0xDE6552C007FFBEE5E632F6B769662B7B9609004BA0D07A460EA3921FB864C26F7F90954FEB7E0DC70959E1DFC990384356D455A6F12D78550744AFFE77805E9FF74C6ECCBEB11513697C8B705A8E67E21D49E2CD5DED72BCAD4A1B259889E9227AE8E5DFCC2C9F0F0817EC487EBF840D02F1B55DDC8AC1CE25C64F35C4D6C04D, N'Tu', N'Cao Tho', N'Xã Đăk R''Moan, Thị xã Gia Nghĩa, Đắc Nông', N'0876543210', 1, CAST(N'2023-11-16T19:46:44.8197090' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user3.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0017', N'haianh@gmail.com', 0xADEF61F87A59A7552D04AF3B03FBA05BD6AA46E1267F10DDE45544044FBDB378A57E0D4B57D425CEF32EEB9D9C22E26118E7B0EC6B603342E8A4A53E8D08AB98, 0x4CC48E438CEDCF92CFF8D56B226ABA9E07A8B9359DFD0D7F80558097D12ACAE8710FE7D31D5B5F4BB93FD1F5B292D2516249462743694EEE5655FB9FA7680128409FDA0B133C797CDEFCC75441A6F08544D13DDE3FAFFA3796AD59A39AAE075C39A7B0ABBFBB721C1A31AF9CBCE795FC5F6071AEB944981DE60D02A71E72A58A, N'Bui', N'Hai Anh', N'Xã Phú Phúc, Huyện Lý Nhân, Hà Nam', N'0998765432', 0, CAST(N'2023-11-16T19:47:31.1816093' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user2.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0018', N'anhtho@gmail.com', 0xF78A6CAB4B04CC2498E30B5B08655BF8D5A8565C203890C35BF0DB7F0535E4AC4D066EBEADC48897C5E5D910036E48EC51E052D66A060112E9B74D093D539C94, 0x165E042710EA5DA576939813902B9976B11E70D0E0F19A28CB4F31300CF608EDC763F179D121874AC514B3DBA5B87432CC0355AD694AAD4BFF193136DDF4277CFE8C1E80FCCC286A2DE7356301FEBAB31EB46882B98D53B2472574BC94AD1056C11C7FBED6286392032FD2AAF72473D5F8817E9F5F344E3FB772B98DBF3D61BF, N'Duong', N'Anh Tho', N'Xã Phổ An, Huyện Đức Phổ, Quảng Ngãi', N'0843216598', 0, CAST(N'2023-11-16T19:48:26.7213305' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user5.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0019', N'xuantam@gmail.com', 0xEF9CCDF43F0D94D8BDFB57B235554F8B3307EB5DDF60DCA67BCE755009641CD8D9C41D40EF41F95DE882006B0738E02E7EF92234A36EB29B16E20200AE216D09, 0x54E37644963CEB6F5605F9F492A7405A2A755DB4CC94CA7B0FF14A8FD3C042E97D711F597AD59DBA112B9A3F868FC3B69CDC6936E7A221CA6C643B5E3A1F445BA34F98005730D1C894EE54BCEE7D8B6C3A98ADAD9698ADAE1CE3F4C6B58BEE162338AA6C7A09AD13D2977EDAEAD20213A7FA372C9FC8F1D7DDC686EBDC6A95FD, N'Diem', N'Xuan Tam', N'Xã Hòa Bắc, Huyện Hòa Vang, Đà Nẵng', N'0932167854', 0, CAST(N'2023-11-16T19:49:07.6872611' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user4.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0020', N'hungphong@gmail.com', 0x731C8FEAF4E3BDF5FAEBC0C69076853E009E099207710BFD57A7AAB6873CB2243DDBA0FE92DF629E99A846925D78B2F5C578A722094F2E8C817D6836A38187A2, 0x8B22D85DB2B3853C559DA0FA42C12CBF272A1D5AB73285329692DDF0B1F324744857C0EDB3431BB6DD93F84AFF57C59974128930271761A3EE2046DE7D23AB571B3C98CB4C8ADE67835195926C32D106748749282CE4D414BF26C8E2F36C124A7F4FE3AF5B1626AECB9011F4807F9773B4D6D6CA22267758C228736554A1C00F, N'Thoi', N'Hung Phong', N'Xã Hòa Bắc, Huyện Hòa Vang, Đà Nẵng', N'0918765432', 1, CAST(N'2023-11-16T19:50:06.6358138' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user3.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0021', N'vietnhan@gmail.com', 0x6AF74BDA00B64009F17267DCCB04CA2BC1AA4E5FB959813F2A57AC586FB35D7CEEF11CC685C8180E46C9BA40F8FFF1F4402827B41C7AAAF39190001BF3D2C16D, 0xA8BAD47394858FB44A8A819E38508A74F7341D004E1A0AC6CF8B2B0516BD3C77A2C3DAA38DB0B5899D5B26B27A72D6472496619F2B2773F80E7036F20FF427E8C9BF3C62C38E38C211C1261A6EFB1B311399EE1CE7D14141F00183761D9BCC9A843B4D8E6AD49793B69AE816F3ED49E3F5085B77CD030952374DCBC3AB777A4D, N'Tri', N'Viet Nhan', N'Xã Trừ Văn Thố, Huyện Bàu Bàng, Bình Dương', N'0987654321', 1, CAST(N'2023-11-16T19:50:58.0407049' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user-8.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0022', N'hunghaha@gmail.com', 0xCCBECF41369B21BCB9B11EDCFF27523D74BD8BA25ED11E8962D547774D11F58FBB235DF1A205DB2668D3FF8B326DDF6EA452F790C40072BAF5D59FA7B1930C87, 0x5D81D6C91F39268CED09B61451736A91CFE51F175F21032806C1161B3C315C249B0715B8FC7B10A55EFFD45B22A6F913F6E03C0A4E8B6FD7F34875F0DF47EB2EFEE2473676FEFF2103F6D46452316BC933CF1732014B1ACEB38C268463D08DC081AEE755021ACFC2289CAE6806811F32266A8908433B065E6751FD400AD226B9, N'Le', N'Viet Hung', N'TPHCM', N'0936555698', 1, CAST(N'2023-11-16T19:53:37.6710886' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user2.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0023', N'phucnguyen22@gmail.com', 0x59E19F195B3EEC4943242B26B94BCFB75E13459FBBCE550011D65CE5F6F8B4931CE71510BA0C4E0FA6A675CC3FEB77F9307251CD41621A6DD56498420F2BD09F, 0x856B6D67F1F5F2CA32A05BC7A7E7859716ADE47E17283527697D5520F27ADC043FDD4F53A05791EF6553D3FE01C919D62F791CBF299B65D4FC700ED718BB1EE1B5344998A3174FB7B647C5E2E5BCCA3648527D0C70075CA61BB7107128A2EB61CC58778D850AD1961FCF2E30241A4CB81652B3557B345C111987613099E5FCDD, N'Dan', N'Tuong Vi', N'Số 80 Đường Nguyễn Thị Định, Quận 2', N'0585236547', 1, CAST(N'2023-11-16T19:55:08.0755607' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user6.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0024', N'huutri@gmail.com', 0xECABFCAB4B1A324345924ADDEA9F8FD2AE55A10E2B6870318EA2C5FC92F6BDFE1AAFC19AC75CAFAA1782F9B29A5A0D4B9599FE982C25313CE8CB0739527E1B28, 0xBB628BC172DB4D44E08C1FA5CD54266A08D030487479B91EB3EC5952CC9970077842F0779502537B7EF769222D16D343D8DF73FFA6F4EA91A2322A900FD5E8312CF2C0088441A0EE487F73B76F98B53A95D4E2A566412D51399AFFF5F64484FA6C7AC0D37500EC8F996B14E8EEF20664875373CBD8C557461CCF7CCF9E3138B7, N'Kha', N'Huu Tri', N'Xã Trừ Văn Thố, Huyện Bàu Bàng, Bình Dương', N'0990123456', 1, CAST(N'2023-11-16T19:55:51.6840891' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user8.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0025', N'tamlinh@gmail.com', 0xE7721128344C9D220FBE6EB1C7CE7FC700AB8E678F4BEDC66EA5AFDC95C2AC45209EE6749A58F54C460018B0F439FE97BBCC1AF67FD58BAE059642BC16D5F584, 0x37BB8C205172601864E70814A1293B19DEBA80468460B4DF0DBB5D1D35822582F81846DF0D4FC4FA06493CA7375E848C0FBD852C5CA0781F12E8F738DF76AA79B7EC546F6803E383C1737D5D2EB203FAF4D24363BF2C22820D3F852044E9771974A328C3AA4DB04AD9D0EB1F57D319C31916346303A474B8E6FB2F5321F217EF, N'Tiep', N'Tam Linh', N'Số 80 Đường Nguyễn Thị Định, Quận 2', N'0989012345', 1, CAST(N'2023-11-16T19:58:00.9462956' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user8.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0026', N'ynhi@gmail.com', 0x11B212A5F01BF1E635F275E61A02492A30F7595BBF0B6ED61BD169E8B4845C29CED15C35CD6E907C866ECC42EC823C709247B0FF96415645841E1D5F14185260, 0xD8D24BDE36575CAE44BAC6422C0836DFDE8155E92E6C7357BF2D1F1B52FC0F04C30AD84207C698CD663866CD41CCE956C401DF12D7A00630E38FA6B648DB74E933C1480C5D29F93D5AF0753601B4F8115D7B38F25611F392EE5B36F598BE7909B8B1D31B01DBCB6786CB9A8CFB067739A06A9263AA626DB8CF12A6055F1D1C2D, N'Xa', N'Y Nhi', N'Xã Phú Phúc, Huyện Lý Nhân, Hà Nam', N'0978901234', 1, CAST(N'2023-11-16T19:58:32.6867825' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user3.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0027', N'quangdat22@gmail.com', 0x9342AD7B716688E7E3B8DE11D1F5A422EFA2CBB8BBBA190C07B2DC725C35A175B48CE30A2B60A6AE89B240A75F296BB2C2A7EC85B15B0A77382464124C43D9FE, 0xE79B2C67BB7369F1E431E8DB3AA74463F9399B518E17C2A146C672C95DDB06CDFC789F838DCF222310AB039A948096C97547A1232CB54973E6E58EE6E38063229BC0838880D5A6895B2D84D001C29A282D130E6990AD41D3AAEAB61E0F3D801537649560765A0EE69F8D3892EB8EC8923EE9BE518A154F50930C14556754F30E, N'Moc', N'Quang Dat', N'Xã Đăk R''Moan, Thị xã Gia Nghĩa, Đắc Nông', N'0978901232', 0, CAST(N'2023-11-16T19:59:16.4216200' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user5.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ST0028', N'lequynh@gmail.com', 0xDBD71AD728D0A89AFD81875068DA0C122920E2F03A5EBBE7FDA84F3B8E042FC08E5624FDD755CFE6256C8EAAA41D3C4D2788874D373C56B8E8945DAC62D0132A, 0x44A985BDE26C5AB1BDE2215888A57D29A74A7CC5F015A839DD102F9F2BB5C7D5B62FD14258F0D8EBE10FC6073F3A718B7EEA07440CCD915D954EB518A5DD80A51A72E3CFD66A60720C5A2D8D160C2EBA7801BFB871E95F331BC13E421C7DF3C3C85623C05E29489A14B4A24646949C405A8F14CCEF281C5AEEA668B5804811B4, N'Leu', N'Le Quynh', N'Xã Hòa Bắc, Huyện Hòa Vang, Đà Nẵng', N'0956789012', 0, CAST(N'2023-11-16T19:59:55.7992643' AS DateTime2), NULL, 1, NULL, NULL, NULL, 2, 0, N'C:\fakepath\user2.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0001', N'string@gmail.com', 0x85F3831167C739C7D78D264FEC7996BD4CA6CFBB98C9E67AD64257DDE53C0F5F85EB765285AF8CBD0F170CED4E36277D7517A5FEA43BA2193AD44B89BD69D97F, 0xEB7ECEF3186D06A763DD3356358A018965E2EE9AD038BA3D83EAABFEE51C2DB2D96F0C7A42D5B0AFE5800161B9335F55F30FC59CFA80BC34B7F83173D51ACAAB68ACBE1ECDE89928E83701BA5E09A9E7C1056E12B5863AA21C783A14D96C584547C7C8711625056F8CE91F7D8B9AA9490673C0B6E4FB8FC78945EDDF31E81E74, N'Toan', N'Hoai Phu', N'Quan 12, Viet Nam', N'0985444123', 1, CAST(N'2023-11-15T12:06:17.2698641' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 1, N'string')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0002', N'string1@gmail.com', 0x83831DC0CCF39192307793C69FBF248486B2081A2C8AC30698EAAEB02183C0616323CD9E6AAA00A65666B8B97C11D10B7FB3521FE6C72FB1BE0313896C41E6A6, 0x0DBC76FA8751A846E562D951C55A7A8854AAD834AA84519AC03E9AA1562754618ED9DD4A3C463487710642020F6A78CDBD71984FA145DD316B4211DA2BBDCB4BF55CE2D9CB7C108EF517752647052E545AAFAABDDF161A0C4055F63069E4B15F4E85E2041707D2CD5D1259026E5177B5C8D4FFB2CB7FC939E3D26BA7F3A08450, N'Huy', N'Phuoc', N'TPHCM', N'0921334567', 1, CAST(N'2023-11-15T13:13:39.8618848' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 9, N'string')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0003', N'hungviet227@gmail.com', 0x8F38C5A08209CCA6341D9A3BB0B9ABAE5DB4E28C46F9F7DCA9A9AA618F461151E30F064CEC5E02C86D7D457B705264BB0104DFF2B15E7C2C0B6B39E9479A1942, 0x0EF2062F02CBA72F4380A5BFEF24C47E394DFB3EA25CAB4824FA7A74F89379878E91C330AE140DF9EAB53644E66E3FB6CDB7386888C732EA4CE77FE9E28A4DC60355865DB71A333B417115B16971B1419F1A1FF194A6AD155A7C22546E1000CA239A6B793C511FA5DA1FDBEAC08A79BFE9B0E919DCA76AA58D2CA2E8151CEEC6, N'Huy', N'Hung', N'TPHCM', N'0833220703', 0, CAST(N'2023-11-16T11:11:31.2812596' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 3, N'C:\fakepath\user4.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0004', N'phuocthien@gmail.com', 0x566369300536B6F35AD0D9584BE893C882FE4F9581CCD76B1EED5D4C8DEB4A6D6BF0DE1BE269FDA785DD40F5F07E6D677AFFCFEB2EDC616B407472F9ADEEC7C3, 0x959DBB5A702A8CDB9C5942B96AAEEDA24C49F29B5F0851796E6ADC4927435C1259498A24B9282B6035B4C787B77CCC18E8AD1BB97ABAC0EADDF2CEDA90DACDAF4BB1938022218689E48B3A72E226C21296ECC324AB28EAD706829085437104018EEB04B95472DB4D1F99DB2E5FB31CA50BF09BF27D5241057C09A3946A07A026, N'Chu', N'Phuoc Huy', N'Xã Trừ Văn Thố, Huyện Bàu Bàng, Bình Dương', N'0900000000', 1, CAST(N'2023-11-16T20:08:36.2164041' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 1, N'C:\fakepath\user4.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0005', N'haiduong@gmail.com', 0x97C5B42980B6A04FD0743038AF865D736413DB64066AE9A7D294939750FC7B1819344860340B50EEAD778968DB1221F7BFF435525497CD727CB4C29A57B84A33, 0x4CF94C9E0CC43F0C918F883621573113D499D3F2DC80EA06F43E40EE66E35ED2D60FE3385390288991A778795B4B32B576108649318279A03AC4F8D4F74E798D3000408D4DDD0F179367AB562AEBD43E4F221FD9F0AD489C7DCC3D6B48E8CC164BA5F439859A1EE1A55F6DCE8E0C86D19D9FCDDFB7DFB716976FD35188245A76, N'La', N'Hai Duong', N'Xã Phổ An, Huyện Đức Phổ, Quảng Ngãi', N'0999999999', 1, CAST(N'2023-11-16T20:09:30.2687301' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 0, N'C:\fakepath\user8.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0006', N'bichho@gmail.com', 0xA5A5836786E5D4AA7314EC86546DD7F08ED8A895911C199C544DE3BEAD8CA84F5196C56EEA8771ED97ECD646E6D419DBBC973A75D3AA871B17D93B29E569B648, 0x86DFE9C2726D5A0F4D8F318577807A122531E059BBFE630E3D432FF7DA939491E9AE35D52686AE3ED7535E708367410DFF45713A513B765FF29B5DE93F0C2249C19DF0CCF26744ED17A99B6C2719CD714EABFA1BD5BC614B14B0F75EDDFCE68FFCDBBDE32B7A1D6ADC4E3B137CA02E2570A8760ED4C028A46997DEEBCB4B3902, N'Lieu', N'Bich Ho', N'Xã Phổ An, Huyện Đức Phổ, Quảng Ngãi', N'0988888888', 0, CAST(N'2023-11-16T20:10:09.0545040' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 0, N'C:\fakepath\user2.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0007', N'uyenthy@gmail.com', 0x3658EF9B963BE792F838A2200A7DE792A2ACB63404E29ADC0DBC04A9214DAA8AD8C7822EC76DC8DC51950D5549EA22F6F9D8FD49049EE9DEFC547374F579CE2B, 0x53F5776FFDA6E9028A39F432DF70D0B867A1E94F4EB2A987930D0B5F1A288EC2AF055BFBE424473DCC7DAC9AF2B9C09DC8427DB310B9BAA334E6579FC6AA4E919CEF7BFCC29A7512EC9D65A9F1EB78EEA3E3AB5E72D9CD62FC8739AE14FE526430BF1380E85A764FCAC86935681EE9DEBD457DABD03DF57DCC3C82FE7230CD1E, N'Phan', N'Uyen Thy', N'Quan 12, Viet Nam', N'0977777777', 0, CAST(N'2023-11-16T20:10:45.8395881' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 0, N'C:\fakepath\user5.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0008', N'hailong@gmail.com', 0x7895051127BB1159CCE1899A6AFFE9F98FED47D90FB4C5544E7B78F789E763DD839C32583C6888BABCDD881F3FAC8F54882D976472F962B58C0F95AD2AD19D85, 0xEBCE7F66CDF6D645A2D70E7BDED0F72306D3AA7422C416CDD12C590A2D1F617437C9CD30F5AEDE84D7E51E7887AD3A9E54468034C0FC10C9CB23CAF57D5C9C7D45F2EED9952B0E05CD563BC0AC16038921B99309EB0A6BA03F35FFB1686AEF31D4049EEEB2AF9FA055EA1BB9C0201FA5520E7075EAE8D6E429485A3210373057, N'Mai', N'Hai Long', N'Xã Hòa Bắc, Huyện Hòa Vang, Đà Nẵng', N'0966666666', 0, CAST(N'2023-11-16T20:11:31.5661552' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 0, N'C:\fakepath\user3.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0009', N'yenthanh@gmail.com', 0xF746EAB4125133D90803DCC088025AAE7656585342CE6633FEA492CA92943BA55C07859C20843A0FF32ACA93E03D898BC1F847F76C01F292E2F063F7DF5D5A82, 0xE96BA3AB2B059FBD1792FEBCBCA8554DAF32AB801FED6FC95E9EDC0A924E28AE49F6C5F0624C360D7935726E661DDE583FC902881B613CBA8B86E2F0E370BCB5711F12750D3D25729036A5EEC0DFCBEAD62D5F8C199322917DB840C79C70E8C5B2E816D00D20379B43E238B9BD5D7C01118BCDB812F85907EBC8BC17BD81134E, N'Ung', N'Yen Thanh', N'Phường Hộ Phòng, Thị xã Giá Rai, Bạc Liêu', N'0955555555', 1, CAST(N'2023-11-16T20:12:12.4584354' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 0, N'C:\fakepath\user-8.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0010', N'minhanh@gmail.com', 0x33CE8DAC349783FB3456BA9DE7948814AD6B156CCAC773681B5C42AB498226CCE3FCD63FD1D5CEA4056CA1A839DB031F7D7246819C9E52BBF740DA52DFA8A48B, 0x81D5A14898BB7D2203DAC05F32A231D923F1C8EA0BEE94C78F4B7BA8A5E285F12795761923FC1C25497D4ACD6C898F10461BA1795E8721B4B3841157CE601A0F4E1478C6E43AA1D9DF6647CF2A8FB146BB6FA27DE3EFAE25866378C52B2451DD1C455FEBB80645DAD8A9F793FCF074C59444951227AB2556DB29FE1009108C03, N'Co', N'Minh Anh', N'Xã Phú Quý, Thị xã Cai Lậy, Tiền Giang', N'0944444444', 1, CAST(N'2023-11-16T20:12:42.0534312' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 0, N'C:\fakepath\user7.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0011', N'minhan@gmail.com', 0x13B003F04E9037C5E6B5D8D1BCB6DEAB204E1602548440A93C9CFD58A08EB6EFE5EA152A672F6469ECA66E3AE05424B308FADD0228B304CCBC9A60503F1E8D62, 0x954E4FFC82BB0FED5E3FC14D8144E57C40872A4D129837D8A3C54BDC9F46B607A13AD4FF1545D9E9517F495F94E499B1076F4676BC797ACA01B171FB12063F913175AA8193627DCE39B5C37FFE4961B9BBD47A9CC793C23778E64EF0C9E063D16C2E16D72B85DB1ACAEE974622F54166193FA4FF57D387B3C4CD7968DCBDEB20, N'Phuong', N'Minh An', N'Xã Phú Phúc, Huyện Lý Nhân, Hà Nam', N'0933333333', 1, CAST(N'2023-11-16T20:13:21.7029462' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 0, N'C:\fakepath\user8.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0012', N'hoaipho@gmail.com', 0xABBC8F94DFB1B67D67FBEF37EF2113F5D74727A768F52DFFDBD9A9824C4524167CE55FFC6F3C7038C425B7F0732690ED6A75FF72E77E834EE00F836CBE1B3C11, 0xD19E08CF6DF025F05404265F9613E2BD5CBAE1C7EDB1FA8186A74CE40FE2B6BA20245C223313709AC0E826D78C26255D728B75B740595C8D9F0E27F423FA8F1CB9BA4ACA9ADA229D30A05D0945C7351C4E498681107C262AC22B63A43B2A7F7007D4B40A6F063E243703C34F9F11A6CAC4CDE524E253489FA10FFB984D74B058, N'Trieu', N'Hoai Pho', N'Phường 02, Quận 4, Hồ Chí Minh (tphcm)', N'0922222222', 1, CAST(N'2023-11-16T20:14:03.9105283' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 0, N'C:\fakepath\user7.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0013', N'hongoc@gmail.com', 0x95B0CD2BCD54C46D92BA0976973E6C445E1B526762037FDA4DBDEC1364D68EE7967A497064A6C31263E3E75BA5FBDEFEB7298658E391F09D13E0BB1A4DEEB302, 0x5A9F5EDDEA6DB3D85AFAE85BA3B1FAD80208A9B4928070B69D8DC3665B8275CFAD032D6371DE580DF2A37F30DAD760E8A4704A0F0E17327D25010F1B35E16DCEDFDD640DE7291D75434A3D9451F6464EB6D9D950562592991DE34D54B70267C1F5E7A9E4DA127B7963D962A58967CDBE741AE7FBEB6E9BED5F53D72C34561D5D, N'Tong', N'Ho Ngoc', N'Xã Phú Phúc, Huyện Lý Nhân, Hà Nam', N'0911111111', 1, CAST(N'2023-11-16T20:14:38.7169836' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 0, N'C:\fakepath\user8.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0014', N'hathanh@gmail.com', 0xEFFEF61EBDF4FC4EBD958918557E658A46E5392F372F3EB9AF37CCE0D0CF3A6F28CFD0E1D7452E6AECF04F08EF5BCE1E48A3C50FA4646AAFEB95697F754F849B, 0x4BE0E6D0388C81F5D03EE2684DCB17C17795F5BE4C7C4BE94B286A72689A9F3A9B90DFE946776E81135D073A38F130C61A2AF18EB54342A7DF1AFDE6A20B6740BED25A22BB3C24C40A0A622AF8D8655DAA99E6C8C0DEB4F49B8F8962784C2589618F07C160A87F13D2043FDADF8BCFC4E84EFF6CAF3AEFC885027485DF7091DF, N'Tinh', N'Ha Thanh', N'Xã Phổ An, Huyện Đức Phổ, Quảng Ngãi', N'0901234567', 0, CAST(N'2023-11-16T20:15:17.4254316' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 1, N'C:\fakepath\user2.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0015', N'nguyetlan@gmail.com', 0xD4AABE7DB90D5218E3F80D6513A7933E8EBF1E2BEB9A13F6133A23FC223B21EA3D021677176F22ED937C7D806D4FCA6DD5D2E8CEC3E92B6FE4618B51383D4D7E, 0xBF6B6595B72430C9C937FFD51385BD4692ED3083DA17E902401A14000583E7D93CA0C93FBF5FB4CD3F59999839C7FD0536CB5580269B784A9E2C767B885710444A6E90AD3DF8475549F9B3A1FF673CB8D14D91CB024A857F6EDA3D2CDDA709C2029B149E622755AEF28812A643423E68D50CE053694D8283F694ACAADBE79355, N'Phan', N'Nguyet Lan', N'Quan 12, Viet Nam', N'0990123451', 1, CAST(N'2023-11-16T20:15:54.1462596' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 4, N'C:\fakepath\user3.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0016', N'minhhoa@gmail.com', 0x4A4421DA614A7F5430E838B1661B369DA388BB4D3863A2F7B75D3B6A7D6E1695640A09F1DFF3CAFFD5819BB0DB8E5C234883B16AE97C16D5F4EEFF3FE1C19BEF, 0xE09E4FFE7D896E503FE6A7C87F9BD9F06708CA336D2C21B1869E6D0B2D3DDB267B877E5A09543186C626BEE3C87D8E70D368108151CD3927ADDEE8C5F2DAA3CDD7FED6ABF496800A6AB9B8B7D62E5FC4DD749E0B946A9B4160A0E6B7C9BFC0CEE0984EA192410341B20A3DB5C33E43DFE2F6236D3DC9DCE94B2F95A8FC20A5AC, N'Cap', N'Minh Hoa', N'Số 80 Đường Nguyễn Thị Định, Quận 2', N'0989012342', 1, CAST(N'2023-11-16T20:16:32.9282443' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 0, N'C:\fakepath\user8.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0017', N'conggia@gmail.com', 0xC9FBD3A352FF46578355B592990CB8A0E303FBF0BF72DCF832E3AAEB128E28ADD5775740FE0864110814D7F50E00AB6D14A5A3487ED85AE19FA87E1F07FB2F48, 0xBFC312EA2D494FE64AB611138145DD4F03A14CF89F77CF7922E4FD0109CA2264B570DC11B1078D5FAC73EB78EB8FBF79850F3927C918AAA7823214378ACD6FA99DD2BC88F417D734AF529666C568400C57129E6230417D57BFABD08F70CA66DE3A6229A64673C8AF739B7DC4C6A016DE145E46430863D095EB3CF8132A3F1503, N'Tham', N'Cong Gia', N'Xã Đăk R''Moan, Thị xã Gia Nghĩa, Đắc Nông', N'0978901231', 1, CAST(N'2023-11-16T20:17:14.8111231' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 4, N'C:\fakepath\user.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0018', N'tieubao@gmail.com', 0x2D9AA4CEEE09EEAAA68F58635BD2DB0791E5837B447FFB82A3DD51AE96761D56BB36F5C900E6AFDCE61FE6B45811796DDFCACB30CF6B6CA7DC544089EAB3E1A0, 0x406416B5163B6F6AC283262D60BC596FE5DBFE4D8FBA81B8F0FAC56CF6D0E06F5EA8DD45FB4F17BF10D59211A4B6CC20074CD22A055FE09E7F547886C9DECF2226EAEF39AA6BBC320D918424C141D8F3EC12FE9FFFBE52307B65CF7D81748857F5AB726661DE204A98E4027F208BBF861CDC0DAE337B9593E168E318A0FB16F8, N'Don', N'Tieu Bao', N'Xã Hòa Bắc, Huyện Hòa Vang, Đà Nẵng', N'0967890123', 1, CAST(N'2023-11-16T20:18:30.5327219' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 1, N'C:\fakepath\user3.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0019', N'trieuvy@gmail.com', 0xD8E70CC75F3A35D04A1FFA5D8FF83F648C124B578F9807C621AD9C4AA88E931A43CDD7572F1C82A870943C772E0183EBC2046FC50C24BE8D63D2AF3DA76ECF3D, 0xFD9636FF8FB739C4A05C6AA9E2C496FD921ED2CD2B604D3F5E72EEE4B0A56E10CC28BB098E192AED40CDF463A18B354F3C111C0AD59104382F4F8EEA9B33A2DECF3BE5150A6E41493BD516C188281A969FD6A624DC1FEA63D5E4074061C75FE1A36F49F191B0BCEC1741F620FDBDE157D536C80F14B56BCF519E6CDCE1E1D9A4, N'Thinh', N'Trieu Vi', N'Quan 12, Viet Nam', N'0967890122', 1, CAST(N'2022-11-16T20:19:06.9032202' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 0, N'C:\fakepath\user6.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0020', N'thuhuyen@gmail.com', 0xF353E1E70882B42E76EF198A0CE5E7073D893E37C162673B534CC1BE3AAFDAA8904EA06335F2CB1F01C11A7069C0ECA2539F73B438334CC8CFBC794EB702D41D, 0x61BBB37FE08291AB1D5F46B777FB75FA018CD9F170BEA400EEB44D074B43EC03DF026EA5052006208A1D44E4945EC91E0BDDF738E8533441CC6051AFC6784928850B518C7CB7815AF3E52869EE7430CC486ABCA24FEACB6CE5F541A4203AE5247DDCD24E569587181D52DD291487C180E9DF51CB67A06B109CDBF263A107A9E7, N'Nham', N'Thu Huyen', N'Xã Hòa Bắc, Huyện Hòa Vang, Đà Nẵng', N'0956789011', 0, CAST(N'2020-11-16T20:19:34.9047961' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 0, N'C:\fakepath\user2.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0021', N'anhnguyen@gmail.com', 0x30B3849DC63C27E50A6DBC83458B829F4A58714612919842B58A779D4C605206C54C3FDBAEF407754830A55B09A1F31C6E9C69AF53DFA5AEA6872B6C5172DC27, 0xCA9BAB28A9315BFE42326076CC12573C4134B4E9CAC2741CC1824E875D32821A07684F9435A3C9692CFB6D515C520F39D1C39610ABD706CD6F17B8A99474F1BD157D5C565C156F14B220E6460EF683411095A5CB54863066CF8E57274E1E4F5F2F18E31158D77F3CC176A67DFBE39F703B6D6D501CE9AFEDAD59E48C21F8D8CF, N'Anh', N'Nguyen', N'TPHCM', N'0945678900', 1, CAST(N'2017-11-16T20:20:01.1593082' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 0, N'C:\fakepath\user7.jpg')
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [PasswordSalt], [Firstname], [Lastname], [Address], [Phone], [Sex], [StartDate], [EndDate], [Status], [RefreshToken], [ResetPassToken], [ResetTokenExpires], [Role], [CountAnimal], [UserImage]) VALUES (N'ZT0022', N'tantai@gmail.com', 0xD94E0AD4F7076CB13C42A86B5C3B0F0B0BABCA9A500DAD59BB23C37E03825CEC175AB391E1FD889089DEE4E683168B2369D0BE2D531B00EB84810F397CE372FF, 0xA2B351A870202CEA7B832FD4E1AD68C8548473608633206AB3D6DA516B0F92534A26F0FDFF7555CB4885C419758BE699D22FD79571CED85AF7335258A6C7FD10FBBD279486036055C79957997F382C3B1C481F0E4237485538C99BB2C93A760B40505A30952B02BC7E51BF86A69A0738C45076BB5804382C4AAC1574B398ED95, N'Khai', N'Tan Tai', N'Xã Quang Thành, Huyện Nguyên Bình, Cao Bằng', N'0934567892', 1, CAST(N'2021-11-16T20:20:39.2914709' AS DateTime2), NULL, 1, NULL, NULL, NULL, 3, 0, N'C:\fakepath\user3.jpg')
GO
ALTER TABLE [dbo].[AnimalCages]  WITH CHECK ADD  CONSTRAINT [FK_AnimalCages_Animals_AnimalId] FOREIGN KEY([AnimalId])
REFERENCES [dbo].[Animals] ([AnimalId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AnimalCages] CHECK CONSTRAINT [FK_AnimalCages_Animals_AnimalId]
GO
ALTER TABLE [dbo].[AnimalCages]  WITH CHECK ADD  CONSTRAINT [FK_AnimalCages_Cages_CageId] FOREIGN KEY([CageId])
REFERENCES [dbo].[Cages] ([CId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AnimalCages] CHECK CONSTRAINT [FK_AnimalCages_Cages_CageId]
GO
ALTER TABLE [dbo].[AnimalMeals]  WITH CHECK ADD  CONSTRAINT [FK_AnimalMeals_Animals_AnimalId] FOREIGN KEY([AnimalId])
REFERENCES [dbo].[Animals] ([AnimalId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AnimalMeals] CHECK CONSTRAINT [FK_AnimalMeals_Animals_AnimalId]
GO
ALTER TABLE [dbo].[AnimalMeals]  WITH CHECK ADD  CONSTRAINT [FK_AnimalMeals_Meals_MealId] FOREIGN KEY([MealId])
REFERENCES [dbo].[Meals] ([MealId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AnimalMeals] CHECK CONSTRAINT [FK_AnimalMeals_Meals_MealId]
GO
ALTER TABLE [dbo].[Animals]  WITH CHECK ADD  CONSTRAINT [FK_Animals_AnimalSpecies_SpeciesId] FOREIGN KEY([SpeciesId])
REFERENCES [dbo].[AnimalSpecies] ([SpeciesId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Animals] CHECK CONSTRAINT [FK_Animals_AnimalSpecies_SpeciesId]
GO
ALTER TABLE [dbo].[AnimalSchedules]  WITH CHECK ADD  CONSTRAINT [FK_AnimalSchedules_Animals_AnimalId] FOREIGN KEY([AnimalId])
REFERENCES [dbo].[Animals] ([AnimalId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AnimalSchedules] CHECK CONSTRAINT [FK_AnimalSchedules_Animals_AnimalId]
GO
ALTER TABLE [dbo].[AnimalSchedules]  WITH CHECK ADD  CONSTRAINT [FK_AnimalSchedules_Schedules_ScheduleId] FOREIGN KEY([ScheduleId])
REFERENCES [dbo].[Schedules] ([ScheduleId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AnimalSchedules] CHECK CONSTRAINT [FK_AnimalSchedules_Schedules_ScheduleId]
GO
ALTER TABLE [dbo].[AnimalTrainers]  WITH CHECK ADD  CONSTRAINT [FK_AnimalTrainers_Animals_AnimalId] FOREIGN KEY([AnimalId])
REFERENCES [dbo].[Animals] ([AnimalId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AnimalTrainers] CHECK CONSTRAINT [FK_AnimalTrainers_Animals_AnimalId]
GO
ALTER TABLE [dbo].[AnimalTrainers]  WITH CHECK ADD  CONSTRAINT [FK_AnimalTrainers_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AnimalTrainers] CHECK CONSTRAINT [FK_AnimalTrainers_Users_UserId]
GO
ALTER TABLE [dbo].[Cages]  WITH CHECK ADD  CONSTRAINT [FK_Cages_Areas_AreaId] FOREIGN KEY([AreaId])
REFERENCES [dbo].[Areas] ([AreaId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Cages] CHECK CONSTRAINT [FK_Cages_Areas_AreaId]
GO
ALTER TABLE [dbo].[ExperienceDetails]  WITH CHECK ADD  CONSTRAINT [FK_ExperienceDetails_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ExperienceDetails] CHECK CONSTRAINT [FK_ExperienceDetails_Users_UserId]
GO
ALTER TABLE [dbo].[ExperienceDetails]  WITH CHECK ADD  CONSTRAINT [FK_ExperienceDetails_WorkExperiences_ExperienceId] FOREIGN KEY([ExperienceId])
REFERENCES [dbo].[WorkExperiences] ([ExperienceId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ExperienceDetails] CHECK CONSTRAINT [FK_ExperienceDetails_WorkExperiences_ExperienceId]
GO
ALTER TABLE [dbo].[FoodMeals]  WITH CHECK ADD  CONSTRAINT [FK_FoodMeals_Foods_FoodId] FOREIGN KEY([FoodId])
REFERENCES [dbo].[Foods] ([FoodId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[FoodMeals] CHECK CONSTRAINT [FK_FoodMeals_Foods_FoodId]
GO
ALTER TABLE [dbo].[FoodMeals]  WITH CHECK ADD  CONSTRAINT [FK_FoodMeals_Meals_MealId] FOREIGN KEY([MealId])
REFERENCES [dbo].[Meals] ([MealId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[FoodMeals] CHECK CONSTRAINT [FK_FoodMeals_Meals_MealId]
GO
ALTER TABLE [dbo].[Foods]  WITH CHECK ADD  CONSTRAINT [FK_Foods_FoodCategories_CategoryId] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[FoodCategories] ([CategoryId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Foods] CHECK CONSTRAINT [FK_Foods_FoodCategories_CategoryId]
GO
ALTER TABLE [dbo].[News]  WITH CHECK ADD  CONSTRAINT [FK_News_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[News] CHECK CONSTRAINT [FK_News_Users_UserId]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Transactions_TransactionId] FOREIGN KEY([TransactionId])
REFERENCES [dbo].[Transactions] ([TransactionId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Transactions_TransactionId]
GO
ALTER TABLE [dbo].[OrderTickets]  WITH CHECK ADD  CONSTRAINT [FK_OrderTickets_Orders_OrderId] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Orders] ([OrderId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[OrderTickets] CHECK CONSTRAINT [FK_OrderTickets_Orders_OrderId]
GO
ALTER TABLE [dbo].[OrderTickets]  WITH CHECK ADD  CONSTRAINT [FK_OrderTickets_Tickets_TicketId] FOREIGN KEY([TicketId])
REFERENCES [dbo].[Tickets] ([TicketId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[OrderTickets] CHECK CONSTRAINT [FK_OrderTickets_Tickets_TicketId]
GO
USE [master]
GO
ALTER DATABASE [ZooManagementTest] SET  READ_WRITE 
GO
