USE [master]
GO
/****** Object:  Database [ArtikelVerwaltung]    Script Date: 04.07.2016 10:05:16 ******/
CREATE DATABASE [ArtikelVerwaltung]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ArtikelVerwaltung_Data', FILENAME = N'D:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\ArtikelVerwaltung.mdf' , SIZE = 4288KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'ArtikelVerwaltung_Log', FILENAME = N'D:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\ArtikelVerwaltung.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [ArtikelVerwaltung] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ArtikelVerwaltung].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ArtikelVerwaltung] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET ARITHABORT OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ArtikelVerwaltung] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ArtikelVerwaltung] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ArtikelVerwaltung] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ArtikelVerwaltung] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET RECOVERY FULL 
GO
ALTER DATABASE [ArtikelVerwaltung] SET  MULTI_USER 
GO
ALTER DATABASE [ArtikelVerwaltung] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ArtikelVerwaltung] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ArtikelVerwaltung] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ArtikelVerwaltung] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [ArtikelVerwaltung] SET DELAYED_DURABILITY = DISABLED 
GO
USE [ArtikelVerwaltung]
GO
/****** Object:  Table [dbo].[Article]    Script Date: 04.07.2016 10:05:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Article](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Description] [text] NOT NULL,
	[Price] [float] NOT NULL,
 CONSTRAINT [PK_Article] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ArticleCart]    Script Date: 04.07.2016 10:05:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ArticleCart](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ArticleID] [int] NOT NULL,
	[CartID] [int] NOT NULL,
 CONSTRAINT [PK_ArticleCart_1] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ArticleCategory]    Script Date: 04.07.2016 10:05:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ArticleCategory](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ArticleID] [int] NOT NULL,
	[CategoryID] [int] NOT NULL,
 CONSTRAINT [PK_ArticleCategory] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Cart]    Script Date: 04.07.2016 10:05:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cart](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[UserID] [int] NOT NULL,
 CONSTRAINT [PK_Cart] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Category]    Script Date: 04.07.2016 10:05:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ParentID] [int] NULL,
	[Name] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[User]    Script Date: 04.07.2016 10:05:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[IsAdmin] [bit] NOT NULL,
	[Email] [nvarchar](255) NOT NULL,
	[Passwort] [nvarchar](255) NOT NULL,
	[SecretQuestion] [nvarchar](255) NOT NULL,
	[SecretAnswer] [nvarchar](255) NOT NULL,
	[Token] [nvarchar](255) NULL,
	[TokenDate] [datetime] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Index [IX_ArticleCart]    Script Date: 04.07.2016 10:05:16 ******/
CREATE NONCLUSTERED INDEX [IX_ArticleCart] ON [dbo].[ArticleCart]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_IsAdmin]  DEFAULT ((0)) FOR [IsAdmin]
GO
ALTER TABLE [dbo].[ArticleCart]  WITH CHECK ADD  CONSTRAINT [FK_ArticleCart_Article] FOREIGN KEY([ArticleID])
REFERENCES [dbo].[Article] ([ID])
GO
ALTER TABLE [dbo].[ArticleCart] CHECK CONSTRAINT [FK_ArticleCart_Article]
GO
ALTER TABLE [dbo].[ArticleCart]  WITH CHECK ADD  CONSTRAINT [FK_ArticleCart_Cart] FOREIGN KEY([CartID])
REFERENCES [dbo].[Cart] ([ID])
GO
ALTER TABLE [dbo].[ArticleCart] CHECK CONSTRAINT [FK_ArticleCart_Cart]
GO
ALTER TABLE [dbo].[ArticleCategory]  WITH CHECK ADD  CONSTRAINT [FK_ArticleCategory_Article] FOREIGN KEY([ArticleID])
REFERENCES [dbo].[Article] ([ID])
GO
ALTER TABLE [dbo].[ArticleCategory] CHECK CONSTRAINT [FK_ArticleCategory_Article]
GO
ALTER TABLE [dbo].[ArticleCategory]  WITH CHECK ADD  CONSTRAINT [FK_ArticleCategory_Category] FOREIGN KEY([CategoryID])
REFERENCES [dbo].[Category] ([ID])
GO
ALTER TABLE [dbo].[ArticleCategory] CHECK CONSTRAINT [FK_ArticleCategory_Category]
GO
ALTER TABLE [dbo].[Cart]  WITH CHECK ADD  CONSTRAINT [FK_Cart_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([ID])
GO
ALTER TABLE [dbo].[Cart] CHECK CONSTRAINT [FK_Cart_User]
GO
USE [master]
GO
ALTER DATABASE [ArtikelVerwaltung] SET  READ_WRITE 
GO
