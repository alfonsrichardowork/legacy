-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2025 at 03:03 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `legacy`
--

-- --------------------------------------------------------

--
-- Table structure for table `activesubwooferspecification`
--

CREATE TABLE `activesubwooferspecification` (
  `id` varchar(191) NOT NULL,
  `speaker` varchar(191) NOT NULL,
  `subwoofer` varchar(191) NOT NULL,
  `daya_amplifier` varchar(191) NOT NULL,
  `filter_lpf_variabel` varchar(191) NOT NULL,
  `input_level` varchar(191) NOT NULL,
  `power_input` varchar(191) NOT NULL,
  `box_type` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activesubwooferspecification`
--

INSERT INTO `activesubwooferspecification` (`id`, `speaker`, `subwoofer`, `daya_amplifier`, `filter_lpf_variabel`, `input_level`, `power_input`, `box_type`, `productId`, `createdAt`, `updatedAt`) VALUES
('5be45e11-9b59-44dc-b299-b438b06b942b', '10 Inch, 4 Ohm', '100 Watt RMS (200 Watt max) @', '13.8 V', '50-250 Hz -12 dB/oct', 'High and Low level', '12 VDC (13.8 VDC)', 'Sealed', 'e91c73a4-5e61-44e5-83ac-f42de65a2c3c', '2024-09-27 01:42:03.106', '2024-10-04 03:39:09.724'),
('98fb9149-1e6e-48a9-a142-04e7cc08acc9', '10 Inch, 4 Ohm', '100Watt RMS (200Watt max) @', '13.8V', '50-250 Hz -12dB/oct', 'High and Low level', '12 VDC (13.8 VDC)', 'Sealed', '84d0978c-8907-458b-a8a8-99d45b40535b', '2024-10-04 03:45:33.513', '2024-10-04 03:45:33.513'),
('d073bccc-78d6-4217-91f9-0d9a38d40fbf', '10 Inch, 4 Ohm', '100Watt RMS (200Watt max) @', '13.8V', '50-250 Hz -12dB/oct', 'High and Low level', '12 VDC (13.8 VDC)', 'Sealed', '78c76b38-9464-446b-ad93-2a10560d25b8', '2024-10-04 04:18:17.265', '2024-10-04 04:18:17.265'),
('f34e8c24-c50f-48fd-a8e1-5093ff8d22d5', '', '', '', '', '', '', '', '4f583bcb-ae46-4e3c-9c77-5525d0f58c1f', '2024-10-03 03:55:34.734', '2024-10-03 03:55:34.734');

-- --------------------------------------------------------

--
-- Table structure for table `allcategory`
--

CREATE TABLE `allcategory` (
  `id` varchar(191) NOT NULL,
  `brandId` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `name` text NOT NULL,
  `slug` text NOT NULL,
  `description` text NOT NULL,
  `thumbnail_url` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `updatedBy` varchar(191) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `allcategory`
--

INSERT INTO `allcategory` (`id`, `brandId`, `type`, `name`, `slug`, `description`, `thumbnail_url`, `createdAt`, `updatedAt`, `updatedBy`) VALUES
('2300407f-0384-4940-84d0-1ac40e76fab7', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Sub Sub Category', 'Tweeter', 'tweeter', 'All Tweeter Products', '', '2024-09-24 08:55:00.225', '2024-09-24 08:55:00.225', 'admin'),
('2460d041-5cb5-48f1-bb18-e3edd5c225b5', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Sub Sub Category', 'Discontinued', 'discontinued', 'All Discontinued Products', '', '2024-09-24 08:54:08.693', '2024-09-24 08:54:08.693', 'admin'),
('54fe181e-61ad-4dad-8f8f-52593be04dc6', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Sub Category', 'Legacy', 'legacy', 'Speaker dari Legacy ini sangat bermacam variannya, mulai dari warna, bentuk tampilan, serta ukurannya (6 inch – 15 inch). Tampilan Speaker dari Legacy ini memberikan wajah baru, dengan desain Dustcap yang lebih simple tapi terlihat elegan sehingga membuat tampilan menjadi lebih Fresh. Pada Conepaper didesain dengan tampilan baru, yaitu menggunakan tehnik jahitan antara Conepaper dan Surround yang berfungsi memperkuat konstruksi Conepaper terhadap Foam Surround speakernya sehingga tidak mudah sobek dan mampu bertahan lebih lama (Durability).', '', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.923', 'admin'),
('60d05b2e-d9b9-4b42-91c3-b9e0c1e883e0', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Sub Sub Category', 'Coaxial', 'coaxial', 'All Coaxial Products', '', '2024-09-24 08:53:57.121', '2024-09-24 08:53:57.121', 'admin'),
('66a82959-e15f-450d-aaba-3397483b6ba8', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Sub Sub Category', 'Woofer', 'woofer', 'All Woofer Products', '', '2024-09-24 08:54:30.658', '2024-12-09 05:28:24.576', 'admin'),
('7f6266c8-762a-4110-8854-9aa985777f30', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Sub Sub Category', 'Full Range', 'full-range', 'All Full Range Products', '', '2024-09-24 08:54:49.922', '2024-09-24 08:54:49.922', 'admin'),
('8fccc11d-9a22-45cd-b3ac-0b5fe29db546', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Sub Category', 'Sparta', 'sparta', 'Car Speaker dengan nama Sparta Series by Legacy mempunyai ciri tersendiri yaitu hasil suara dari speaker ini lebih tajam dan karakternya bisa dibilang lebih akustik. Sparta Series by Legacy ini memiliki lambang seperti kesatria yang menggambarkan speaker yang powerful dengan desain yang simple tetapi tetap terlihat garang. Ditambah dengan logo Sparta yang menyerupai tameng kesatria Yunani Kuno pada Dustcap speaker ini, sehingga mampu menghadang produk Car Subwoofer dari Import China. Speaker ini memiliki varian yang tidak banyak yaitu hanya 10 inch dan 12inch dengan kombinasi warna hitam dan kuning sehingga memberikan kesan yang elegan.', '', '2024-10-17 07:01:00.319', '2024-10-17 07:01:00.319', 'admin'),
('a197ed73-8307-4ffa-9a3b-0aac190e1452', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Category', 'Drivers', 'drivers', 'All Legacy Audio Drivers', '', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'admin'),
('b2fcc14b-c60f-4bc7-913f-56bc3247fdeb', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Sub Category', 'Prestige', 'prestige', 'Prestige series dari Legacy hadir dengan berbagai varian speaker yang dirancang untuk memberikan performa audio terbaik di mobil Anda. Dari segi tampilan, Prestige Series membawa penyegaran dengan desain yang modern dan elegan. Mulai dari ukuran 6 inch hingga 15 inch, setiap speaker dalam seri ini menampilkan Dustcap yang dirancang lebih simple namun tetap elegan, memberikan kesan visual yang bersih dan modern di dalam mobil.', '', '2024-09-24 08:52:58.509', '2024-09-27 06:15:19.280', 'admin'),
('c54a3345-7d95-43a2-8b82-80cfe47e4125', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Sub Sub Category', 'Active Subwoofer', 'active-subwoofer', 'All Active Subwoofer Products', '', '2024-09-24 08:53:42.918', '2024-12-09 05:28:18.146', 'admin'),
('e5f21898-2a62-4131-b3ee-90962859f682', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Sub Sub Category', 'Subwoofer', 'subwoofer', 'All Subwoofer Products', '', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.084', 'admin'),
('f903d822-7ea8-434d-a1d1-a88ddc652cfb', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Sub Category', 'Energy', 'energy', 'Speaker Energy Series dari Legacy ini memiliki ciri khas dengan warna Orange dan didesain cocok untuk kebutuhan Subwoofer Car Speaker. Speaker Energy Series ada beberapa varian ukuran dari 6 inch - 12 inch. Kelebihan dari tipe ini dilengkapi dengan Magnet Rubber Cover yang berfungsi melindungi megnet dari benturan serta nilai tambah estetika speakernya . Pada Conepaper didesain dengan tampilan baru, yaitu menggunakan teknik jahitan antara Conepaper dan Surround yang berfungsi untuk menambah dan lebih memaksimalkan Durabillity speaker. Selain itu juga mampu memberikan Energy Positif bagi yang menggunakan speaker ini.', '', '2024-10-17 07:00:40.004', '2024-10-17 07:00:40.004', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `allproductcategory`
--

CREATE TABLE `allproductcategory` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `categoryId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `name` text NOT NULL,
  `slug` text NOT NULL,
  `type` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `allproductcategory`
--

INSERT INTO `allproductcategory` (`id`, `productId`, `categoryId`, `createdAt`, `updatedAt`, `name`, `slug`, `type`) VALUES
('01190928-3c1c-4281-83f8-45def33baeeb', '3213ef26-e2ab-4332-8d12-6ad1f18f39a2', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('0647e7d8-65a8-430d-bf16-0b947781aa7d', 'c2abeea1-3c8d-4900-af2a-6fcb27bcb738', '8fccc11d-9a22-45cd-b3ac-0b5fe29db546', '2024-10-17 07:01:00.319', '2024-10-17 07:01:00.319', 'Sparta', 'sparta', 'Sub Category'),
('0d032614-7309-4690-a543-1c7aa022e942', '970f6aa5-91f5-464c-96e4-83f86280d053', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('1081629d-f7e5-4e11-93b5-1b499ad52342', 'b4e5347e-fd18-4b47-a74a-6d90c6e0c305', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('12fe6819-f415-43fa-84ce-02513f291ca3', '6f3b950d-f94f-4c21-8e42-7e05251434b4', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('13109e02-d431-477f-858b-14915302f49c', 'c0118d2b-ca07-4d5d-9819-42b1fdc27655', 'b2fcc14b-c60f-4bc7-913f-56bc3247fdeb', '2024-09-24 08:52:58.509', '2024-09-27 06:15:19.283', 'Prestige', 'prestige', 'Sub Category'),
('158ea76a-2b82-4e88-babb-50678192b45b', 'e3770df5-ea15-4be2-85f5-703caecdfd36', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('19f0c8d8-fe07-4876-8e66-f39e66aea38b', '970f6aa5-91f5-464c-96e4-83f86280d053', '60d05b2e-d9b9-4b42-91c3-b9e0c1e883e0', '2024-09-24 08:53:57.121', '2024-09-24 08:53:57.121', 'Coaxial', 'coaxial', 'Sub Sub Category'),
('1ba26bfb-c0a3-40a4-ba32-8ca6fb8c1c0d', 'b4e5347e-fd18-4b47-a74a-6d90c6e0c305', 'b2fcc14b-c60f-4bc7-913f-56bc3247fdeb', '2024-09-24 08:52:58.509', '2024-09-27 06:15:19.283', 'Prestige', 'prestige', 'Sub Category'),
('1d425655-725b-4991-bbed-e2eb92f45236', '77932324-df07-44d8-84d2-30af8ae38c0a', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('1f2f8938-0c75-44ba-a96e-381f01296989', '963116bc-4fef-48ae-a8e6-f655be756dc7', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.939', 'Legacy', 'legacy', 'Sub Category'),
('1fbc95ec-6b57-4579-81d5-8ba3fc5f5a3d', '42802840-d898-46ea-8377-7e0a9b6a060f', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('20c88081-2fba-4bcb-8857-aa06aeae1712', 'b9658a8b-77d9-4e00-8e0a-99b52fb1fad4', 'b2fcc14b-c60f-4bc7-913f-56bc3247fdeb', '2024-09-24 08:52:58.509', '2024-09-27 06:15:19.283', 'Prestige', 'prestige', 'Sub Category'),
('20fbc737-32d6-43e4-b62e-e9e3caff24cf', 'e3770df5-ea15-4be2-85f5-703caecdfd36', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.939', 'Legacy', 'legacy', 'Sub Category'),
('220b7525-d8e3-4846-8102-d1ae70caffbb', '77932324-df07-44d8-84d2-30af8ae38c0a', 'f903d822-7ea8-434d-a1d1-a88ddc652cfb', '2024-10-17 07:00:40.004', '2024-10-17 07:00:40.004', 'Energy', 'energy', 'Sub Category'),
('2424694b-2e0c-428b-b20c-f0ddccb97199', '2e888496-0048-4943-982f-ebfdd4625e1f', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('2454c5c9-9e6c-43f5-940a-98adfb31d860', 'cc2d7eb7-526f-4ffe-923d-4b6c57fb9006', '8fccc11d-9a22-45cd-b3ac-0b5fe29db546', '2024-10-17 07:01:00.319', '2024-10-17 07:01:00.319', 'Sparta', 'sparta', 'Sub Category'),
('26c983cb-caad-4d22-a1d3-6d819a40ae49', '4899e144-b93b-446a-89b4-b055230545ee', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('26d44119-38a0-41ec-9900-76c13e3b178c', 'bd5ecf65-04d8-4b4d-813b-cffd8748b0fa', 'f903d822-7ea8-434d-a1d1-a88ddc652cfb', '2024-10-17 07:00:40.004', '2024-10-17 07:00:40.004', 'Energy', 'energy', 'Sub Category'),
('26f2e515-5008-4ba4-b985-8d8c7c4a2184', '6f3b950d-f94f-4c21-8e42-7e05251434b4', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('27bb1b1b-0d8d-4e18-9dc8-329113acfe71', '62a47bd6-a0c2-4df9-9cd0-21c496076a5a', 'f903d822-7ea8-434d-a1d1-a88ddc652cfb', '2024-10-17 07:00:40.004', '2024-10-17 07:00:40.004', 'Energy', 'energy', 'Sub Category'),
('285fb5d4-d9d5-4f00-8a9f-5853cf6add17', '164c19d2-170f-4b48-958e-68ec335392f0', 'b2fcc14b-c60f-4bc7-913f-56bc3247fdeb', '2024-09-24 08:52:58.509', '2024-09-27 06:15:19.283', 'Prestige', 'prestige', 'Sub Category'),
('3027cd39-3d55-4678-9bc0-bbfba96c669d', 'c52ce46f-89a5-4576-a4fd-8a7ae5cf1f53', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('30995118-8e50-454c-8183-a5da1cb14d3d', '8c29e60a-34c0-4b99-b9bf-104be2655e65', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('31bf88f8-66a0-4c70-ba20-8b2cd6274d74', 'fdd744f3-a65e-4c33-b2b6-81306f7b47f8', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('3b2f6dae-a239-4127-9687-c2274f9f3325', '963116bc-4fef-48ae-a8e6-f655be756dc7', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('3c19f0cd-ac35-4cca-a333-ce56201d3cb4', '498bc88a-d5e6-4314-ad72-499ea3f1f780', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.939', 'Legacy', 'legacy', 'Sub Category'),
('4134c4dc-e070-4dc3-a297-998000367e6e', '4899e144-b93b-446a-89b4-b055230545ee', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('449204df-c3e2-4e45-888f-1408eae5e20b', '164c19d2-170f-4b48-958e-68ec335392f0', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('4944f540-6317-4377-9811-b1500ffaa74c', '2b1193f0-37cb-4576-9bfc-028cd5694d0e', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.939', 'Legacy', 'legacy', 'Sub Category'),
('4c902b65-0086-4db4-ba5e-306e20aabcb5', '55fd0ddf-cd00-45a1-8ee0-6fd4231bd69e', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('54c38e74-a045-47f4-9abc-d353fa438a65', '95bba079-4da5-4ac3-8a9a-9fdf23f146b7', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('5553618d-b06d-4c4e-b606-9c44dddf7246', '7a0b71f7-4400-4318-af0e-fc23c27171d1', 'b2fcc14b-c60f-4bc7-913f-56bc3247fdeb', '2024-09-24 08:52:58.509', '2024-09-27 06:15:19.283', 'Prestige', 'prestige', 'Sub Category'),
('5577eddf-8a23-462d-ace1-c993d7e1696d', '8c29e60a-34c0-4b99-b9bf-104be2655e65', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.939', 'Legacy', 'legacy', 'Sub Category'),
('56f6e7c5-cfd0-43dd-a4c2-a553feeb47db', '95bba079-4da5-4ac3-8a9a-9fdf23f146b7', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.939', 'Legacy', 'legacy', 'Sub Category'),
('591fabb1-c7cb-49d7-91bf-36df36139c52', '5fa5a613-16a3-4b8f-92c6-dd2bd7b68f8b', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('5951ae50-64ba-4263-935c-2c4b63d72b21', '2b1193f0-37cb-4576-9bfc-028cd5694d0e', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('5b9b719a-1b47-44c9-a3a6-e0c15a3c3de5', '96f6309b-96d1-466f-9dbb-bff04e8e1fac', '60d05b2e-d9b9-4b42-91c3-b9e0c1e883e0', '2024-09-24 08:53:57.121', '2024-09-24 08:53:57.121', 'Coaxial', 'coaxial', 'Sub Sub Category'),
('5c587d79-5928-45be-a9b4-ad9f808352c6', '41a41be4-0044-4958-b270-7afa8207446c', '7f6266c8-762a-4110-8854-9aa985777f30', '2024-09-24 08:54:49.922', '2024-09-24 08:54:49.922', 'Full Range', 'full-range', 'Sub Sub Category'),
('5c77a9c2-2496-4b05-b902-190364b40b18', 'c0118d2b-ca07-4d5d-9819-42b1fdc27655', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('5edb8298-b476-48cc-a564-803116fe6573', 'c52ce46f-89a5-4576-a4fd-8a7ae5cf1f53', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.939', 'Legacy', 'legacy', 'Sub Category'),
('60d057fb-98e3-4232-b4df-33b78055cc6b', '62a47bd6-a0c2-4df9-9cd0-21c496076a5a', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('6360769a-e2f9-4b46-931d-534ae244e752', '963116bc-4fef-48ae-a8e6-f655be756dc7', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('659856d9-e186-4bd4-ba47-053081c49ff6', '69db9385-8c1f-4863-a07d-30e3fc952ec6', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('67c77359-aff8-4e12-ac23-798c6e027684', 'c2abeea1-3c8d-4900-af2a-6fcb27bcb738', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('6934b889-cd6d-4776-8d27-ca69770f3288', 'c2abeea1-3c8d-4900-af2a-6fcb27bcb738', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('6f6efc62-1b09-41b8-92a8-19b15c3ec381', '3213ef26-e2ab-4332-8d12-6ad1f18f39a2', '66a82959-e15f-450d-aaba-3397483b6ba8', '2024-09-24 08:54:30.658', '2024-12-09 05:28:24.579', 'Woofer', 'woofer', 'Sub Sub Category'),
('70fb2628-8d33-401d-9cbe-b9a25bf97d5c', '58e4147b-93a0-4809-955d-d04ce1161c5e', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.939', 'Legacy', 'legacy', 'Sub Category'),
('71024eb0-f276-4508-9197-52942e20a76e', '62a47bd6-a0c2-4df9-9cd0-21c496076a5a', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('765c3456-c1a3-453a-8631-6ed4df6a8571', '41a41be4-0044-4958-b270-7afa8207446c', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('780c94fd-04b4-4578-81e3-ba50a13ead74', 'fdd744f3-a65e-4c33-b2b6-81306f7b47f8', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('79ad8ede-3fb3-43f1-940f-54d6ac6a2c72', 'fdd744f3-a65e-4c33-b2b6-81306f7b47f8', '8fccc11d-9a22-45cd-b3ac-0b5fe29db546', '2024-10-17 07:01:00.319', '2024-10-17 07:01:00.319', 'Sparta', 'sparta', 'Sub Category'),
('7a7a8932-5693-4e9b-a577-b9aef2ebec1b', '745f44c7-888c-4919-832c-99fb176ff0fa', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.923', 'Legacy', 'legacy', 'Sub Category'),
('7bb1d361-ea04-4610-97bc-abc6014dcd6b', 'b912e31b-58aa-4b51-a7d2-f1b80ebdfc0d', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('7ca71515-6687-4115-bb1c-187eba89f8f9', 'b9658a8b-77d9-4e00-8e0a-99b52fb1fad4', '7f6266c8-762a-4110-8854-9aa985777f30', '2024-09-24 08:54:49.922', '2024-09-24 08:54:49.922', 'Full Range', 'full-range', 'Sub Sub Category'),
('7ee6788f-dff1-48b6-8a59-7c58a2f43e05', 'e3770df5-ea15-4be2-85f5-703caecdfd36', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('806a4eb8-49e0-4758-b9d7-5e6831dee6d9', '8c29e60a-34c0-4b99-b9bf-104be2655e65', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('81948534-7ad3-4559-b2c8-f5f23452bdc4', '78c76b38-9464-446b-ad93-2a10560d25b8', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('82b6aa1a-bd72-4d07-b800-83a89b2ee2eb', 'b912e31b-58aa-4b51-a7d2-f1b80ebdfc0d', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.939', 'Legacy', 'legacy', 'Sub Category'),
('847d866e-08bd-4bcb-a9e0-ffe8c01048d0', '69db9385-8c1f-4863-a07d-30e3fc952ec6', 'f903d822-7ea8-434d-a1d1-a88ddc652cfb', '2024-10-17 07:00:40.004', '2024-10-17 07:00:40.004', 'Energy', 'energy', 'Sub Category'),
('84d81dea-e49e-48ff-99b5-bcdac96a031c', '58e4147b-93a0-4809-955d-d04ce1161c5e', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('85791212-8dfb-43ba-9249-456761ccc76c', '55fd0ddf-cd00-45a1-8ee0-6fd4231bd69e', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('86e369c9-daf4-4f77-8e0a-64a9c202a0aa', '164c19d2-170f-4b48-958e-68ec335392f0', '7f6266c8-762a-4110-8854-9aa985777f30', '2024-09-24 08:54:49.922', '2024-09-24 08:54:49.922', 'Full Range', 'full-range', 'Sub Sub Category'),
('89d68a28-d2ae-4a00-bb2e-f9be9e6a0f4c', '96f6309b-96d1-466f-9dbb-bff04e8e1fac', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('8a4be9df-23e4-4124-95d9-4bae6d52cc85', '78c76b38-9464-446b-ad93-2a10560d25b8', 'c54a3345-7d95-43a2-8b82-80cfe47e4125', '2024-09-24 08:53:42.918', '2024-12-09 05:28:18.200', 'Active Subwoofer', 'active-subwoofer', 'Sub Sub Category'),
('8b08bf4e-b146-4e67-8353-f1a3e910ccba', '55fd0ddf-cd00-45a1-8ee0-6fd4231bd69e', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.939', 'Legacy', 'legacy', 'Sub Category'),
('8cbbfb83-9292-4102-a374-aeb4505e8c1b', 'b4e5347e-fd18-4b47-a74a-6d90c6e0c305', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('9739e56a-cd37-4c02-9691-57215b38a4c4', '41a41be4-0044-4958-b270-7afa8207446c', 'b2fcc14b-c60f-4bc7-913f-56bc3247fdeb', '2024-09-24 08:52:58.509', '2024-09-27 06:15:19.283', 'Prestige', 'prestige', 'Sub Category'),
('99c7ab84-d4c8-4540-8d42-8139941b4c9e', '7a0b71f7-4400-4318-af0e-fc23c27171d1', '7f6266c8-762a-4110-8854-9aa985777f30', '2024-09-24 08:54:49.922', '2024-09-24 08:54:49.922', 'Full Range', 'full-range', 'Sub Sub Category'),
('9a65c8d3-9478-4908-96c7-9679c43229ce', '78c76b38-9464-446b-ad93-2a10560d25b8', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.923', 'Legacy', 'legacy', 'Sub Category'),
('9a85b9fd-987b-4927-8d06-db98be0195ea', '6f3b950d-f94f-4c21-8e42-7e05251434b4', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.939', 'Legacy', 'legacy', 'Sub Category'),
('9b2304ea-add5-4498-bf20-7f437c56787b', 'ad3d4329-2433-42aa-8b0e-542a474f1c91', '7f6266c8-762a-4110-8854-9aa985777f30', '2024-09-24 08:54:49.922', '2024-09-24 08:54:49.922', 'Full Range', 'full-range', 'Sub Sub Category'),
('a020bf6e-1797-449f-8b9d-85354cbe89f9', '498bc88a-d5e6-4314-ad72-499ea3f1f780', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('a21d8020-117b-4259-b4b1-d071c95e7664', '5fa5a613-16a3-4b8f-92c6-dd2bd7b68f8b', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.939', 'Legacy', 'legacy', 'Sub Category'),
('a3cd495f-1cdf-48ce-b82f-aebc91651cd7', 'ad3d4329-2433-42aa-8b0e-542a474f1c91', 'b2fcc14b-c60f-4bc7-913f-56bc3247fdeb', '2024-09-24 08:52:58.509', '2024-09-27 06:15:19.283', 'Prestige', 'prestige', 'Sub Category'),
('a55868ca-d796-4b6c-a6da-63fe6425e00b', 'b9658a8b-77d9-4e00-8e0a-99b52fb1fad4', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('a9837090-652d-4ce1-8b61-6617dde3b800', '96f6309b-96d1-466f-9dbb-bff04e8e1fac', 'b2fcc14b-c60f-4bc7-913f-56bc3247fdeb', '2024-09-24 08:52:58.509', '2024-09-27 06:15:19.283', 'Prestige', 'prestige', 'Sub Category'),
('ac2f8391-909f-4f03-a15a-0d896de39069', '745f44c7-888c-4919-832c-99fb176ff0fa', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('aef1dd0f-4b88-45e3-b053-26e007894ab2', 'bfef1a40-3cc6-4bc0-85dc-12501e9c8b8a', '66a82959-e15f-450d-aaba-3397483b6ba8', '2024-09-24 08:54:30.658', '2024-12-09 05:28:24.579', 'Woofer', 'woofer', 'Sub Sub Category'),
('b278d927-81e5-4c36-b4ac-581275c1e0c9', '2e888496-0048-4943-982f-ebfdd4625e1f', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('b373ab82-887f-47ca-a304-85f5d3eee60c', 'bfef1a40-3cc6-4bc0-85dc-12501e9c8b8a', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('b4a540a8-aceb-4fd5-81a7-b8d5c7659d53', '3213ef26-e2ab-4332-8d12-6ad1f18f39a2', 'b2fcc14b-c60f-4bc7-913f-56bc3247fdeb', '2024-09-24 08:52:58.509', '2024-09-27 06:15:19.283', 'Prestige', 'prestige', 'Sub Category'),
('b552db98-11c2-4635-a40e-626f45a19cb2', 'c0118d2b-ca07-4d5d-9819-42b1fdc27655', '2300407f-0384-4940-84d0-1ac40e76fab7', '2024-09-24 08:55:00.225', '2024-09-24 08:55:00.225', 'Tweeter', 'tweeter', 'Sub Sub Category'),
('bc8b171a-cce1-4474-858f-9eaab52d02f2', '77932324-df07-44d8-84d2-30af8ae38c0a', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('bd0ae207-11e2-4411-8699-3d96e50dfdd3', '4899e144-b93b-446a-89b4-b055230545ee', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.939', 'Legacy', 'legacy', 'Sub Category'),
('bd1966d4-ef5b-4ca0-ab23-7902ac0d1396', '7a0b71f7-4400-4318-af0e-fc23c27171d1', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('bfe3d375-b243-479d-b906-eb785f63a084', '3d4dd01e-42bc-41b7-8015-9c5d8afc8f1e', 'b2fcc14b-c60f-4bc7-913f-56bc3247fdeb', '2024-09-24 08:52:58.509', '2024-09-27 06:15:19.283', 'Prestige', 'prestige', 'Sub Category'),
('c32b598a-003b-4d9e-95e4-0e4f5d124754', '5fa5a613-16a3-4b8f-92c6-dd2bd7b68f8b', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('c7f74a28-ae14-4e55-ac3b-f0cadc73817f', '42802840-d898-46ea-8377-7e0a9b6a060f', 'b2fcc14b-c60f-4bc7-913f-56bc3247fdeb', '2024-09-24 08:52:58.509', '2024-09-27 06:15:19.283', 'Prestige', 'prestige', 'Sub Category'),
('d082b458-2df9-4489-9a6c-ca1db7aafe5c', 'bd5ecf65-04d8-4b4d-813b-cffd8748b0fa', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('d37db0cf-301b-44b8-978a-0227d3c00e06', 'bd5ecf65-04d8-4b4d-813b-cffd8748b0fa', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('d4e7f4f0-8c73-439f-847a-e30403f393ad', '3d4dd01e-42bc-41b7-8015-9c5d8afc8f1e', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('d673c155-5afa-4c39-b3b4-7f112f309150', 'ad3d4329-2433-42aa-8b0e-542a474f1c91', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('d691bc0e-f9ee-4146-94d5-c09c8666591b', 'bfef1a40-3cc6-4bc0-85dc-12501e9c8b8a', 'b2fcc14b-c60f-4bc7-913f-56bc3247fdeb', '2024-09-24 08:52:58.509', '2024-09-27 06:15:19.283', 'Prestige', 'prestige', 'Sub Category'),
('da35709a-ccd6-4cfd-8f5e-83d4b8fd0b94', 'b912e31b-58aa-4b51-a7d2-f1b80ebdfc0d', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('df1c14ea-9662-46cf-bec7-f9b661a6a3ac', '2e888496-0048-4943-982f-ebfdd4625e1f', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.939', 'Legacy', 'legacy', 'Sub Category'),
('e09bfb80-09b3-4c9e-8f0a-eddb2aadc8f9', '69db9385-8c1f-4863-a07d-30e3fc952ec6', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('e22e417c-748a-4586-a847-b216040cfea4', '2b1193f0-37cb-4576-9bfc-028cd5694d0e', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('e2a1e126-e6ea-4cb3-82ce-f278353bda2a', 'cc2d7eb7-526f-4ffe-923d-4b6c57fb9006', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('e39bfcba-9344-4545-a1f5-f4406f8fc8e5', '42802840-d898-46ea-8377-7e0a9b6a060f', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('e760d791-2a77-43ae-9034-2e46092e9ff5', '498bc88a-d5e6-4314-ad72-499ea3f1f780', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('e77015b5-a605-4040-b5d5-6b9498f2647d', '745f44c7-888c-4919-832c-99fb176ff0fa', '2300407f-0384-4940-84d0-1ac40e76fab7', '2024-09-24 08:55:00.225', '2024-09-24 08:55:00.225', 'Tweeter', 'tweeter', 'Sub Sub Category'),
('f34bd16f-81dc-4afa-82ae-e0b328fcbcdc', 'cc2d7eb7-526f-4ffe-923d-4b6c57fb9006', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('f8b19a44-5357-4be8-a2f3-098bc3226857', '970f6aa5-91f5-464c-96e4-83f86280d053', '54fe181e-61ad-4dad-8f8f-52593be04dc6', '2024-09-24 08:53:10.959', '2024-09-27 06:14:54.939', 'Legacy', 'legacy', 'Sub Category'),
('f9953b7f-4f60-4fe4-baab-8a46608ad0e1', '95bba079-4da5-4ac3-8a9a-9fdf23f146b7', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('fb384dd4-b052-43c8-82c3-9184b8849973', '3d4dd01e-42bc-41b7-8015-9c5d8afc8f1e', 'e5f21898-2a62-4131-b3ee-90962859f682', '2024-09-24 08:53:30.455', '2024-12-09 05:28:07.104', 'Subwoofer', 'subwoofer', 'Sub Sub Category'),
('fc2be18f-971f-4a90-a5f7-6b4a6a34f078', '58e4147b-93a0-4809-955d-d04ce1161c5e', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category'),
('fe26c474-5b25-43c4-b1bb-1f2ab9785a56', 'c52ce46f-89a5-4576-a4fd-8a7ae5cf1f53', 'a197ed73-8307-4ffa-9a3b-0aac190e1452', '2024-09-24 08:52:40.206', '2024-09-24 08:52:40.206', 'Drivers', 'drivers', 'Category');

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id` varchar(191) NOT NULL,
  `name` text NOT NULL,
  `userId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `name`, `userId`, `createdAt`, `updatedAt`) VALUES
('680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Legacy', '25cd8d0d-d185-41e8-9943-fdf1264236f2', '2024-03-28 07:42:40.393', '2024-09-24 01:37:14.138');

-- --------------------------------------------------------

--
-- Table structure for table `cover_image`
--

CREATE TABLE `cover_image` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `url` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cover_image`
--

INSERT INTO `cover_image` (`id`, `productId`, `url`, `createdAt`, `updatedAt`) VALUES
('05b4f87f-ffb2-4d1b-87a8-ad16cbd38b66', '58e4147b-93a0-4809-955d-d04ce1161c5e', '/uploads/productcoverimage/1733969592789-12in LG 1277-2.webp', '2024-12-13 00:50:52.327', '2024-12-13 00:50:52.327'),
('075b404e-bb96-4fcf-9a17-db978c493151', 'b9658a8b-77d9-4e00-8e0a-99b52fb1fad4', '/uploads/productcoverimage/1732765167247-6.5in BST 1614 collage.webp', '2024-12-09 08:58:14.315', '2024-12-09 08:58:14.315'),
('0a42abce-73c3-4800-8880-2d25ccf668f1', '5fa5a613-16a3-4b8f-92c6-dd2bd7b68f8b', '/uploads/productcoverimage/1732254648921-10in LG 1077-2 collage.webp', '2024-11-28 03:10:43.881', '2024-11-28 03:10:43.881'),
('16962f4c-bd50-4ac1-9445-28c8503a9d33', 'fdd744f3-a65e-4c33-b2b6-81306f7b47f8', '/uploads/productcoverimage/1732254879382-12in LG-12385-2 SPARTA Collage.webp', '2024-12-09 08:59:35.584', '2024-12-09 08:59:35.584'),
('1ebd2c38-d1e6-49c2-9b6a-536f22d0a38c', 'b912e31b-58aa-4b51-a7d2-f1b80ebdfc0d', '/uploads/productcoverimage/1732254591415-12in LG 1292-2 collage.webp', '2024-11-28 03:19:22.606', '2024-11-28 03:19:22.606'),
('240ea1fa-2dc2-4a8b-9106-6bc4024df138', '164c19d2-170f-4b48-958e-68ec335392f0', '/uploads/productcoverimage/1731894853776-5in-BST-522-Mk3-2way-Collage.webp', '2024-12-09 08:58:33.637', '2024-12-09 08:58:33.637'),
('31bc8f9a-84d3-46cb-bdb6-d17e423ce94b', '41a41be4-0044-4958-b270-7afa8207446c', '/uploads/productcoverimage/1731894927170-6X9in-BST-6981-Mk1-collage.webp', '2024-12-09 08:57:24.171', '2024-12-09 08:57:24.171'),
('41740473-1a77-4d3c-9922-c511deecaea2', '95bba079-4da5-4ac3-8a9a-9fdf23f146b7', '/uploads/productcoverimage/1727916244772-lg 696 2 layout.webp', '2024-11-28 03:22:07.574', '2024-11-28 03:22:07.574'),
('525858ac-d742-440e-8236-6c1a7f5864fb', 'ad3d4329-2433-42aa-8b0e-542a474f1c91', '/uploads/productcoverimage/1732254773218-6.5in BST 615 Mk3 Collage.webp', '2024-12-09 08:57:50.384', '2024-12-09 08:57:50.384'),
('5e06cc92-0ef1-423b-952f-4651c0027ebb', '3d4dd01e-42bc-41b7-8015-9c5d8afc8f1e', '/uploads/productcoverimage/1731893093700-12in 1254 collage.webp', '2024-11-28 03:32:11.124', '2024-11-28 03:32:11.124'),
('629e9436-92b3-4e9b-b216-a32eff0e6f41', 'c0118d2b-ca07-4d5d-9819-42b1fdc27655', '/uploads/productcoverimage/1732254609880-PG 298.webp', '2024-11-28 03:42:36.376', '2024-11-28 03:42:36.376'),
('63f52dee-962b-4154-ad0d-a4817b3ca673', '4899e144-b93b-446a-89b4-b055230545ee', '/uploads/productcoverimage/1731395653031-10in LG-1098-2 collage.webp', '2024-11-28 03:12:45.628', '2024-11-28 03:12:45.628'),
('64a3195c-c4e5-4263-af5a-e986cfea2e77', '2e888496-0048-4943-982f-ebfdd4625e1f', '/uploads/productcoverimage/1727254194974-69.jpg', '2024-11-28 03:12:56.222', '2024-11-28 03:12:56.222'),
('6dbc4278-befb-4424-a8e6-de2294d81f5f', 'bd5ecf65-04d8-4b4d-813b-cffd8748b0fa', '/uploads/productcoverimage/1733969545020-8in LG-838-2-Mk1.webp', '2024-12-12 02:13:24.823', '2024-12-12 02:13:24.823'),
('797d802b-a189-4fd9-919f-ce3ca2aa0f24', 'e8b1b732-196b-4f84-9f7a-a4b24f28c521', '/uploads/productcoverimage/1745799609322-1040 cone.webp', '2025-04-28 00:20:11.189', '2025-04-28 00:20:11.189'),
('7f51924c-021a-4a99-b4dd-20cd290f976b', '77932324-df07-44d8-84d2-30af8ae38c0a', '/uploads/productcoverimage/1732254833508-12in LG 1238-2 LEGACY ENERGY Collage.webp', '2024-12-09 08:59:16.262', '2024-12-09 08:59:16.262'),
('805100b5-42ac-46a0-aee9-86783678fa35', 'cc2d7eb7-526f-4ffe-923d-4b6c57fb9006', '/uploads/productcoverimage/1734414918838-10in LG 10385 collage.jpg.webp', '2024-12-17 05:55:19.913', '2024-12-17 05:55:19.913'),
('823821e5-35b4-4206-8f47-c46136a66982', '963116bc-4fef-48ae-a8e6-f655be756dc7', '/uploads/productcoverimage/1732254919464-12in LG 1296-2 Mk1 Collage.webp', '2024-12-09 09:00:16.591', '2024-12-09 09:00:16.591'),
('830734a5-16b4-4065-b9bd-76c045e8bca5', '6f3b950d-f94f-4c21-8e42-7e05251434b4', '/uploads/productcoverimage/1732254432006-12in LG 1295-2 Mk1 Collage.webp', '2024-11-28 03:19:37.776', '2024-11-28 03:19:37.776'),
('871d18ca-3d47-41da-8a2b-fd9132603de2', '7a0b71f7-4400-4318-af0e-fc23c27171d1', '/uploads/productcoverimage/1731892945440-4in BST 422 Mk3 Collage.webp', '2024-12-09 08:58:52.970', '2024-12-09 08:58:52.970'),
('93665a79-495d-4870-a194-cdd974ed039a', 'c52ce46f-89a5-4576-a4fd-8a7ae5cf1f53', '/uploads/productcoverimage/1731893028804-15in LG 1596 collage.webp', '2024-11-28 03:20:58.025', '2024-11-28 03:20:58.025'),
('964b61a7-56ee-4a71-b1fe-1aab4a792954', '62a47bd6-a0c2-4df9-9cd0-21c496076a5a', '/uploads/productcoverimage/1727254278366-26.jpg', '2024-11-28 03:43:16.939', '2024-11-28 03:43:16.939'),
('9671f3c2-bffa-4a7d-805e-3813fd19f153', 'c2abeea1-3c8d-4900-af2a-6fcb27bcb738', '/uploads/productcoverimage/1732254500346-12in LG-12386-2 SPARTA Collage.webp', '2024-11-28 03:25:39.987', '2024-11-28 03:25:39.987'),
('a558f64e-515a-491c-9cd2-a17a27b06199', '745f44c7-888c-4919-832c-99fb176ff0fa', '/uploads/productcoverimage/1731395194632-LG 138 front.webp', '2024-11-28 03:31:33.789', '2024-11-28 03:31:33.789'),
('a95b18ed-faf0-4b90-a720-9d4c34eb2bd0', '2b1193f0-37cb-4576-9bfc-028cd5694d0e', '/uploads/productcoverimage/1731395912433-12in LG 1299 collage.webp', '2024-11-28 03:20:43.407', '2024-11-28 03:20:43.407'),
('abdeb293-723b-4557-86ae-f56c8d628c2c', '42802840-d898-46ea-8377-7e0a9b6a060f', '/uploads/productcoverimage/1731395570075-pg 1054 2 layout.webp', '2024-11-28 03:31:53.137', '2024-11-28 03:31:53.137'),
('b4e6e04b-e964-42e2-bd9b-1c43b2116295', 'bfef1a40-3cc6-4bc0-85dc-12501e9c8b8a', '/uploads/productcoverimage/1731893247095-4in 8347 KH collage.webp', '2024-11-28 03:34:00.594', '2024-11-28 03:34:00.594'),
('b592f719-7854-47b7-9cb3-9ad62a384c46', '78c76b38-9464-446b-ad93-2a10560d25b8', '/uploads/productcoverimage/1728015452703-73.jpg', '2024-11-28 03:13:07.619', '2024-11-28 03:13:07.619'),
('bb76a846-41fe-46dc-9c1a-ea34d7e16b37', '96f6309b-96d1-466f-9dbb-bff04e8e1fac', '/uploads/productcoverimage/1731895876705-4in BST 1023 Dual Cone Collage.webp', '2024-12-09 08:56:57.104', '2024-12-09 08:56:57.104'),
('c7de04dc-fa23-4dac-9479-7713d71b4c8a', '8c29e60a-34c0-4b99-b9bf-104be2655e65', '/uploads/productcoverimage/1731395725556-10in 1096-Mk1 collage.webp', '2024-12-09 09:00:42.292', '2024-12-09 09:00:42.292'),
('cf711881-d504-4286-a4ed-29690f44763f', '3213ef26-e2ab-4332-8d12-6ad1f18f39a2', '/uploads/productcoverimage/1731893197584-4in 8347 BH Collage.webp', '2024-11-28 03:33:43.389', '2024-11-28 03:33:43.389'),
('db008262-a8b5-4dfc-933e-c4accc1cc714', '498bc88a-d5e6-4314-ad72-499ea3f1f780', '/uploads/productcoverimage/1732254361941-12in LG 1298-2 Collage.webp', '2024-11-28 03:20:26.644', '2024-11-28 03:20:26.644'),
('e1f503c3-7e50-49ae-9d1e-894a20c509d1', '970f6aa5-91f5-464c-96e4-83f86280d053', '/uploads/productcoverimage/1731892992652-6.5in LG 6521 collage.webp', '2024-12-09 08:59:53.445', '2024-12-09 08:59:53.445'),
('e5010a78-d0c7-4527-b283-d98db526da4f', 'b4e5347e-fd18-4b47-a74a-6d90c6e0c305', '/uploads/productcoverimage/1731893145756-8in 854 Prestige Colalge.webp', '2024-11-28 03:32:29.306', '2024-11-28 03:32:29.306'),
('e62c7128-f2fb-4747-9c25-ac22a2419186', 'e3770df5-ea15-4be2-85f5-703caecdfd36', '/uploads/productcoverimage/1734055163564-10in LG-1095-2 Mk1 Collage.webp', '2024-12-13 01:59:24.739', '2024-12-13 01:59:24.739'),
('eef6c020-465e-44e0-b6fc-bdbd80f73c16', '69db9385-8c1f-4863-a07d-30e3fc952ec6', '/uploads/productcoverimage/1731395976776-6in 638 collage.webp', '2024-11-28 03:23:18.530', '2024-11-28 03:23:18.530'),
('fd29be08-4dbe-47ad-a69f-994dca86c820', '55fd0ddf-cd00-45a1-8ee0-6fd4231bd69e', '/uploads/productcoverimage/1731395849472-8in LG 896 collage.webp', '2024-11-28 03:22:53.638', '2024-11-28 03:22:53.638');

-- --------------------------------------------------------

--
-- Table structure for table `drawing_image`
--

CREATE TABLE `drawing_image` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `url` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `featured_image`
--

CREATE TABLE `featured_image` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `url` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `featured_image`
--

INSERT INTO `featured_image` (`id`, `productId`, `url`, `createdAt`, `updatedAt`) VALUES
('042af5ac-92df-46ca-818b-438f21f76822', 'b4e5347e-fd18-4b47-a74a-6d90c6e0c305', '/uploads/featuredimages/1735875741756-1733969924783-PG 854-2 Red.webp', '2025-01-03 03:42:21.846', '2025-01-03 03:42:21.846'),
('770ca9f5-c323-41a2-86ee-0ec11048c922', '58e4147b-93a0-4809-955d-d04ce1161c5e', '/uploads/featuredimages/1735875729044-cropped-1733969827686-Legacy1277&1299.webp', '2025-01-03 03:42:09.138', '2025-01-03 03:42:09.138'),
('9becc811-575d-4bd3-b317-cf2dc870fbbb', 'bd5ecf65-04d8-4b4d-813b-cffd8748b0fa', '/uploads/featuredimages/1735875720032-cropped-1733969904682-638&838.webp', '2025-02-07 06:12:02.791', '2025-02-07 06:12:02.791'),
('d5c6138f-5749-4414-bb66-965af0573a34', 'e8b1b732-196b-4f84-9f7a-a4b24f28c521', '/uploads/featuredimages/1745463523705-Legacy 1240 Limited Edition.webp', '2025-04-24 02:58:44.886', '2025-04-24 02:58:44.886'),
('e3371df7-3225-4373-9aef-38d285fbee41', '7a0b71f7-4400-4318-af0e-fc23c27171d1', '/uploads/featuredimages/1732072219440-4in BST 422 Mk3 Collage.webp', '2024-12-03 03:01:40.041', '2024-12-03 03:01:40.041'),
('ea4125b9-0fcf-4072-97c1-5ee06f95acca', 'fdd744f3-a65e-4c33-b2b6-81306f7b47f8', '/uploads/featuredimages/1735875750492-cropped-1733969935616-12385 SPARTA.webp', '2025-01-03 03:42:30.585', '2025-01-03 03:42:30.585');

-- --------------------------------------------------------

--
-- Table structure for table `graph_image`
--

CREATE TABLE `graph_image` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `url` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `graph_image`
--

INSERT INTO `graph_image` (`id`, `productId`, `url`, `createdAt`, `updatedAt`) VALUES
('1777a7f0-a192-402f-b401-9dec41a23274', 'b9658a8b-77d9-4e00-8e0a-99b52fb1fad4', '/uploads/productfrequencyresponse/1733734694037-BST 1614 Respon Frekuensi.webp', '2024-12-09 08:58:14.316', '2024-12-09 08:58:14.316'),
('19bfc805-c2dc-4591-a428-c39a4b776d0f', '96f6309b-96d1-466f-9dbb-bff04e8e1fac', '/uploads/productfrequencyresponse/1733734616854-4in BST 1023 Dual Cone Respon Frekuensi.webp', '2024-12-09 08:56:57.104', '2024-12-09 08:56:57.104'),
('203ea75b-5acd-4634-9487-c531cdd49f19', '963116bc-4fef-48ae-a8e6-f655be756dc7', '/uploads/productfrequencyresponse/1733734816340-12in LG 1296-2 Mk1 Respon Frekuensi.webp', '2024-12-09 09:00:16.591', '2024-12-09 09:00:16.591'),
('2763cd1d-84fa-4e5e-bb17-df9fcd44b474', 'bd5ecf65-04d8-4b4d-813b-cffd8748b0fa', '/uploads/productfrequencyresponse/1733969545070-8in LG-838-2-Mk1 Respon Frekuensi.webp', '2024-12-12 02:13:24.823', '2024-12-12 02:13:24.823'),
('346623ea-4260-4308-b4cc-bdf9c28a2804', 'e3770df5-ea15-4be2-85f5-703caecdfd36', '/uploads/productfrequencyresponse/1731395781069-10in 1095-2 Mk1 Respon Frekuensi.webp', '2024-12-13 01:59:24.740', '2024-12-13 01:59:24.740'),
('353de05c-76a0-4062-9299-a891e1475ac3', '3d4dd01e-42bc-41b7-8015-9c5d8afc8f1e', '/uploads/productfrequencyresponse/1731893093771-12in PG 1254 Respon Frekuensi.webp', '2024-11-28 03:32:11.124', '2024-11-28 03:32:11.124'),
('3774e2e8-62d3-4a5e-84c7-e44afb803b41', '55fd0ddf-cd00-45a1-8ee0-6fd4231bd69e', '/uploads/productfrequencyresponse/1731395849542-8in LG 896 Respon frekuensi.webp', '2024-11-28 03:22:53.638', '2024-11-28 03:22:53.638'),
('3bff0a82-4593-4e40-a998-66bdb54ed032', '498bc88a-d5e6-4314-ad72-499ea3f1f780', '/uploads/productfrequencyresponse/1732254362002-12in LG 1298-2 RF.webp', '2024-11-28 03:20:26.644', '2024-11-28 03:20:26.644'),
('4979cde3-c96c-42aa-ab9a-6bfab3abd418', '95bba079-4da5-4ac3-8a9a-9fdf23f146b7', '/uploads/productfrequencyresponse/1727745200595-6in-LG-696-2-LEGACY-respon-freq.webp', '2024-11-28 03:22:07.574', '2024-11-28 03:22:07.574'),
('53fee7de-6795-42bd-8438-4c3a12f19cf0', 'cc2d7eb7-526f-4ffe-923d-4b6c57fb9006', '/uploads/productfrequencyresponse/1733734591430-10385 Respon Frekuensi.webp', '2024-12-17 05:55:19.914', '2024-12-17 05:55:19.914'),
('54f56349-3047-4173-8748-a92e6c2d6960', '77932324-df07-44d8-84d2-30af8ae38c0a', '/uploads/productfrequencyresponse/1733734756015-12in LG 1238-2 LEGACY Respon Frekuensi.webp', '2024-12-09 08:59:16.263', '2024-12-09 08:59:16.263'),
('61963211-7581-474d-b72c-4c6a23f45391', '42802840-d898-46ea-8377-7e0a9b6a060f', '/uploads/productfrequencyresponse/1731895109812-pg 1054 2 Respon Frekuensi.webp', '2024-11-28 03:31:53.137', '2024-11-28 03:31:53.137'),
('61aec287-6eb5-4ece-907b-1ed42d448337', '4899e144-b93b-446a-89b4-b055230545ee', '/uploads/productfrequencyresponse/1731395653091-1098 respon frekuensi.webp', '2024-11-28 03:12:45.628', '2024-11-28 03:12:45.628'),
('8f7b67dc-04a0-4c60-8e3d-921623e7148c', '8c29e60a-34c0-4b99-b9bf-104be2655e65', '/uploads/productfrequencyresponse/1733734841996-1096-2 Respon Frekuensi.webp', '2024-12-09 09:00:42.292', '2024-12-09 09:00:42.292'),
('921fc888-d901-49c8-8747-9975d70ee9a6', 'c2abeea1-3c8d-4900-af2a-6fcb27bcb738', '/uploads/productfrequencyresponse/1732254500413-12386 Respon Frekuensi.webp', '2024-11-28 03:25:39.987', '2024-11-28 03:25:39.987'),
('9921275e-35b9-42c4-ae13-ed626fdcf3e0', 'ad3d4329-2433-42aa-8b0e-542a474f1c91', '/uploads/productfrequencyresponse/1733734670058-6.5in BST 615 Mk3 Respon Frekuensi .webp', '2024-12-09 08:57:50.384', '2024-12-09 08:57:50.384'),
('ad4912ff-7725-4de6-9414-48b57df8e06a', 'c52ce46f-89a5-4576-a4fd-8a7ae5cf1f53', '/uploads/productfrequencyresponse/1732254129131-15in LG 1596 cone RF.webp', '2024-11-28 03:20:58.025', '2024-11-28 03:20:58.025'),
('b28cdc86-b710-4fa1-baa8-0744b803f0c2', 'b912e31b-58aa-4b51-a7d2-f1b80ebdfc0d', '/uploads/productfrequencyresponse/1732254591484-1292 Respon frekuensi.webp', '2024-11-28 03:19:22.606', '2024-11-28 03:19:22.606'),
('b6071d62-995e-4ba3-a13e-c35147a02cef', '970f6aa5-91f5-464c-96e4-83f86280d053', '/uploads/productfrequencyresponse/1733734793215-6.5in LG 6521 Respon Frekuensi.webp', '2024-12-09 08:59:53.445', '2024-12-09 08:59:53.445'),
('bd447deb-d1e7-4077-b384-eb06aa855a63', '58e4147b-93a0-4809-955d-d04ce1161c5e', '/uploads/productfrequencyresponse/1733969592895-1277-2 Respon Frekuensi.webp', '2024-12-13 00:50:52.327', '2024-12-13 00:50:52.327'),
('cbede2a1-aa87-4761-9d95-e832dee6300f', '6f3b950d-f94f-4c21-8e42-7e05251434b4', '/uploads/productfrequencyresponse/1732254432064-1295 Respon Frekuensi.webp', '2024-11-28 03:19:37.776', '2024-11-28 03:19:37.776'),
('d9461414-9679-4f93-b599-d5c5b026ed32', '164c19d2-170f-4b48-958e-68ec335392f0', '/uploads/productfrequencyresponse/1733734713403-5in BST 522 Mk3 Respon Frekuensi.webp', '2024-12-09 08:58:33.637', '2024-12-09 08:58:33.637'),
('e07ee47e-3358-4ff3-b934-40f73e98b2f6', '69db9385-8c1f-4863-a07d-30e3fc952ec6', '/uploads/productfrequencyresponse/1731395976841-6in 638 Respon Frekuensi.webp', '2024-11-28 03:23:18.530', '2024-11-28 03:23:18.530'),
('e0a265fe-7f31-430f-aa7d-7a7fd55db530', '2b1193f0-37cb-4576-9bfc-028cd5694d0e', '/uploads/productfrequencyresponse/1731395912495-respon frekuensi LG 1299.webp', '2024-11-28 03:20:43.408', '2024-11-28 03:20:43.408'),
('e4ee2de1-e888-4d7f-a9a3-1e484f5f253c', 'b4e5347e-fd18-4b47-a74a-6d90c6e0c305', '/uploads/productfrequencyresponse/1731893145812-8in 854 Prestige Frekuensi Response.webp', '2024-11-28 03:32:29.306', '2024-11-28 03:32:29.306'),
('f27609a0-3972-4004-a542-7def54fe9e1b', '41a41be4-0044-4958-b270-7afa8207446c', '/uploads/productfrequencyresponse/1733734643908-6X9in BST 6981 Mk1 Respon Frekuensi.webp', '2024-12-09 08:57:24.171', '2024-12-09 08:57:24.171'),
('f58139cd-7c93-4408-89b3-2565c0b46841', '5fa5a613-16a3-4b8f-92c6-dd2bd7b68f8b', '/uploads/productfrequencyresponse/1732254648993-1077 Respon Frekuensi.webp', '2024-11-28 03:10:43.882', '2024-11-28 03:10:43.882'),
('f5c3fdc5-8488-4827-be4c-9508c9521c2e', '7a0b71f7-4400-4318-af0e-fc23c27171d1', '/uploads/productfrequencyresponse/1733734732727-4in BST 422 Respon Frekuensi.webp', '2024-12-09 08:58:52.970', '2024-12-09 08:58:52.970'),
('fe631789-2db4-4531-9778-e6db3bad0a27', 'fdd744f3-a65e-4c33-b2b6-81306f7b47f8', '/uploads/productfrequencyresponse/1733734775305-12in LG-12385-2 SPARTA Respon Frekuensi.webp', '2024-12-09 08:59:35.585', '2024-12-09 08:59:35.585');

-- --------------------------------------------------------

--
-- Table structure for table `image_catalogues`
--

CREATE TABLE `image_catalogues` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `url` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `name` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `image_catalogues`
--

INSERT INTO `image_catalogues` (`id`, `productId`, `url`, `createdAt`, `updatedAt`, `name`) VALUES
('02fa6593-e9d8-4aaa-bd45-e5cebbc2aba7', 'b4e5347e-fd18-4b47-a74a-6d90c6e0c305', '/uploads/productimagecatalogues/1731893146020-8in 854 Prestige magnet cone chasis.webp', '2024-11-28 03:32:29.306', '2024-11-28 03:32:29.306', 'Side Top'),
('0345bb28-3bd4-4128-85aa-1c0083ad6ae4', '498bc88a-d5e6-4314-ad72-499ea3f1f780', '/uploads/productimagecatalogues/1732254362170-12in LG 1298-2 Magnet.webp', '2024-11-28 03:20:26.644', '2024-11-28 03:20:26.644', 'Bottom'),
('06f66b15-1948-4e2d-a51d-283e90dd16da', 'cc2d7eb7-526f-4ffe-923d-4b6c57fb9006', '/uploads/productimagecatalogues/1734055213560-10in LG 10385 (2).webp', '2024-12-17 05:55:19.913', '2024-12-17 05:55:19.913', 'Top'),
('085809ea-cfbb-46f0-bb4f-194270a1a7b0', '55fd0ddf-cd00-45a1-8ee0-6fd4231bd69e', '/uploads/productimagecatalogues/1731395849646-8in LG 896 cone.webp', '2024-11-28 03:22:53.637', '2024-11-28 03:22:53.637', 'Top'),
('0d7a1a7c-b7ea-4749-b02f-cbec94483f40', '96f6309b-96d1-466f-9dbb-bff04e8e1fac', '/uploads/productimagecatalogues/1731895876822-4in BST 1023 Dual Cone no mesh.webp', '2024-12-09 08:56:57.103', '2024-12-09 08:56:57.103', 'Top No Mesh'),
('0de2bdbe-c133-4176-9f27-adfc36ba212c', 'e3770df5-ea15-4be2-85f5-703caecdfd36', '/uploads/productimagecatalogues/1731395781230-1095-2 Mk1 Chassis.webp', '2024-12-13 01:59:24.739', '2024-12-13 01:59:24.739', 'Side'),
('0e1ab8ad-1282-42c2-87e2-1e9d4d281c13', '41a41be4-0044-4958-b270-7afa8207446c', '/uploads/productimagecatalogues/1731894927233-6X9in-BST-6981-Mk1-cone.webp', '2024-12-09 08:57:24.170', '2024-12-09 08:57:24.170', 'Top'),
('10d70a2b-1065-43e1-964d-f36f00b76a19', 'b912e31b-58aa-4b51-a7d2-f1b80ebdfc0d', '/uploads/productimagecatalogues/1732254591662-12in LG 1292-2 magnet.webp', '2024-11-28 03:19:22.605', '2024-11-28 03:19:22.605', 'Bottom'),
('16567a4d-f613-429b-bd3f-4e3eceebbf25', '77932324-df07-44d8-84d2-30af8ae38c0a', '/uploads/productimagecatalogues/1732254833771-12in LG 1238-2 LEGACY Chasis.webp', '2024-12-09 08:59:16.262', '2024-12-09 08:59:16.262', 'Side Bottom'),
('166eca3b-5654-4fe7-8075-59b775976c67', '963116bc-4fef-48ae-a8e6-f655be756dc7', '/uploads/productimagecatalogues/1732254919574-12in LG 1296-2 Mk1 Magnet.webp', '2024-12-09 09:00:16.591', '2024-12-09 09:00:16.591', 'Bottom'),
('19263487-976d-44d9-b3a6-a7002841d59f', 'bfef1a40-3cc6-4bc0-85dc-12501e9c8b8a', '/uploads/productimagecatalogues/1731893247174-4in 8347 KH Magnet.webp', '2024-11-28 03:34:00.594', '2024-11-28 03:34:00.594', 'Bottom'),
('1b4ef847-33b9-46a9-8339-68992c043df4', 'c2abeea1-3c8d-4900-af2a-6fcb27bcb738', '/uploads/productimagecatalogues/1732254500585-12in LG-12386-2 SPARTA Magnet.webp', '2024-11-28 03:25:39.986', '2024-11-28 03:25:39.986', 'Bottom'),
('2a6066f1-4756-437b-8ed3-245e4e1dbf53', '6f3b950d-f94f-4c21-8e42-7e05251434b4', '/uploads/productimagecatalogues/1732254432307-12in LG 1295-2 Mk1 Chasis.webp', '2024-11-28 03:19:37.776', '2024-11-28 03:19:37.776', 'Side Bottom'),
('2e2b8365-ab52-41d9-a8cc-4743da0cc3ae', '8c29e60a-34c0-4b99-b9bf-104be2655e65', '/uploads/productimagecatalogues/1731395725672-10in 1096-Mk1 magnet.webp', '2024-12-09 09:00:42.291', '2024-12-09 09:00:42.291', 'Side'),
('2f2e0486-e24f-46fb-85c8-1b280c923295', '95bba079-4da5-4ac3-8a9a-9fdf23f146b7', '/uploads/productimagecatalogues/1730865885560-1727745200678-lg-696-2-cone-1024x1021.webp', '2024-11-28 03:22:07.574', '2024-11-28 03:22:07.574', 'Top'),
('306db6ca-74ee-49ff-b027-c897957b8ec6', '3213ef26-e2ab-4332-8d12-6ad1f18f39a2', '/uploads/productimagecatalogues/1731893197682-4in 8347 BH Magnet.webp', '2024-11-28 03:33:43.389', '2024-11-28 03:33:43.389', 'Bottom'),
('33273d92-5bff-4dc8-b500-6e8085ffacc8', '5fa5a613-16a3-4b8f-92c6-dd2bd7b68f8b', '/uploads/productimagecatalogues/1732254649218-10in LG 1077-2 chasis.webp', '2024-11-28 03:10:43.881', '2024-11-28 03:10:43.881', 'Side Bottom'),
('33cc154f-98ee-4308-954e-3f7d20ebb44a', '42802840-d898-46ea-8377-7e0a9b6a060f', '/uploads/productimagecatalogues/1731395570224-pg 1054 2 magnet.webp', '2024-11-28 03:31:53.137', '2024-11-28 03:31:53.137', 'Bottom'),
('350c14bd-6602-4f2e-aa8c-a27c53fde92d', '41a41be4-0044-4958-b270-7afa8207446c', '/uploads/productimagecatalogues/1731894927292-6X9in-BST-6981-Mk1-cone-no-mesh.webp', '2024-12-09 08:57:24.170', '2024-12-09 08:57:24.170', 'Top No Mesh'),
('359defee-a37c-4816-8974-656a6d68e9a3', 'fdd744f3-a65e-4c33-b2b6-81306f7b47f8', '/uploads/productimagecatalogues/1732254879494-12in LG-12385-2 SPARTA Magnet.webp', '2024-12-09 08:59:35.583', '2024-12-09 08:59:35.583', 'Bottom'),
('392894e8-26e2-43c5-aee9-8c2ed6ddc51f', '8c29e60a-34c0-4b99-b9bf-104be2655e65', '/uploads/productimagecatalogues/1731395725717-10in 1096-Mk1 magnet top.webp', '2024-12-09 09:00:42.291', '2024-12-09 09:00:42.291', 'Bottom'),
('3b198340-756e-4ff5-b666-57338961d0c5', '42802840-d898-46ea-8377-7e0a9b6a060f', '/uploads/productimagecatalogues/1731395570185-pg 1054 2 chassis.webp', '2024-11-28 03:31:53.137', '2024-11-28 03:31:53.137', 'Side Bottom'),
('3ee9dc6c-3f60-4c4e-8af4-d8f7c72f4845', '3213ef26-e2ab-4332-8d12-6ad1f18f39a2', '/uploads/productimagecatalogues/1731893197637-4in 8347 BH Cone.webp', '2024-11-28 03:33:43.389', '2024-11-28 03:33:43.389', 'Top'),
('408c87d5-2424-47a6-a6b9-921293e98a0b', '970f6aa5-91f5-464c-96e4-83f86280d053', '/uploads/productimagecatalogues/1731892992814-6.5in LG 6521 magnet.webp', '2024-12-09 08:59:53.445', '2024-12-09 08:59:53.445', 'Bottom'),
('41993558-4736-4c84-bf1b-fa09c8b0df2b', '6f3b950d-f94f-4c21-8e42-7e05251434b4', '/uploads/productimagecatalogues/1732254432202-12in LG 1295-2 Mk1 Cone.webp', '2024-11-28 03:19:37.776', '2024-11-28 03:19:37.776', 'Top'),
('49a24017-248d-49df-b619-6236dfe59071', '963116bc-4fef-48ae-a8e6-f655be756dc7', '/uploads/productimagecatalogues/1732254919633-12in LG 1296-2 Mk1 Chasis.webp', '2024-12-09 09:00:16.591', '2024-12-09 09:00:16.591', 'Side Bottom'),
('502e91fd-1f54-4369-8304-ded3516f0959', '963116bc-4fef-48ae-a8e6-f655be756dc7', '/uploads/productimagecatalogues/1732254919527-12in LG 1296-2 Mk1 Cone.webp', '2024-12-09 09:00:16.591', '2024-12-09 09:00:16.591', 'Top'),
('53623feb-62fb-4d53-aaa7-2834ef235737', '4899e144-b93b-446a-89b4-b055230545ee', '/uploads/productimagecatalogues/1731395653235-10in LG-1098-2 magnet.webp', '2024-11-28 03:12:45.627', '2024-11-28 03:12:45.627', 'Side'),
('53be2e67-ae3a-4ccf-a13e-3c0069e4f5c0', 'b9658a8b-77d9-4e00-8e0a-99b52fb1fad4', '/uploads/productimagecatalogues/1732765167406-BST 1614 chasis.webp', '2024-12-09 08:58:14.315', '2024-12-09 08:58:14.315', 'Side'),
('54a27c63-13e2-4b68-806a-bad86477d1f4', '5fa5a613-16a3-4b8f-92c6-dd2bd7b68f8b', '/uploads/productimagecatalogues/1732254649173-10in LG 1077-2 magnet.webp', '2024-11-28 03:10:43.881', '2024-11-28 03:10:43.881', 'Bottom'),
('56a3f5bf-9155-4c57-b84e-60086bf51b58', 'b9658a8b-77d9-4e00-8e0a-99b52fb1fad4', '/uploads/productimagecatalogues/1732765167358-BST 1614 magnet.webp', '2024-12-09 08:58:14.315', '2024-12-09 08:58:14.315', 'Bottom'),
('59597d7d-ab5d-4976-8906-7bf319b741bd', 'bfef1a40-3cc6-4bc0-85dc-12501e9c8b8a', '/uploads/productimagecatalogues/1731893247136-4in 8347 KH Cone.webp', '2024-11-28 03:34:00.594', '2024-11-28 03:34:00.594', 'Top'),
('5de46b56-52ae-498c-9956-c93719815293', 'e3770df5-ea15-4be2-85f5-703caecdfd36', '/uploads/productimagecatalogues/1731395781188-1095-2 Mk1 Cone.webp', '2024-12-13 01:59:24.739', '2024-12-13 01:59:24.739', 'Top'),
('5e75580c-f0e7-41e8-bfc0-964093fff08e', '5fa5a613-16a3-4b8f-92c6-dd2bd7b68f8b', '/uploads/productimagecatalogues/1732254649107-10in LG 1077-2 cone.webp', '2024-11-28 03:10:43.881', '2024-11-28 03:10:43.881', 'Top'),
('613108fe-c17f-4b64-b79b-63180e0a332f', '41a41be4-0044-4958-b270-7afa8207446c', '/uploads/productimagecatalogues/1731894927334-6X9in-BST-6981-Mk1-chasis.webp', '2024-12-09 08:57:24.170', '2024-12-09 08:57:24.170', 'Side'),
('64a5aab9-51eb-4ee2-af84-2451f0963b0d', '69db9385-8c1f-4863-a07d-30e3fc952ec6', '/uploads/productimagecatalogues/1731395977014-6in 638 chassis.webp', '2024-11-28 03:23:18.530', '2024-11-28 03:23:18.530', 'Side'),
('69e4712c-7cb2-4ee0-ab1f-36c8fdb5e7f0', '95bba079-4da5-4ac3-8a9a-9fdf23f146b7', '/uploads/productimagecatalogues/1730865885685-1727678256578-lg-696-2-magnet-1024x1024.webp', '2024-11-28 03:22:07.574', '2024-11-28 03:22:07.574', 'Bottom'),
('6ad0dfd0-7564-4cdc-9744-81672240a2b5', 'fdd744f3-a65e-4c33-b2b6-81306f7b47f8', '/uploads/productimagecatalogues/1732254879447-12in LG-12385-2 SPARTA Cone.webp', '2024-12-09 08:59:35.583', '2024-12-09 08:59:35.583', 'Top'),
('782de09c-1a91-4cbc-9d77-c86fdc78d07a', 'e8b1b732-196b-4f84-9f7a-a4b24f28c521', '/uploads/productimagecatalogues/1745799609630-1240 magnet.webp', '2025-04-28 00:20:11.189', '2025-04-28 00:20:11.189', 'Magnet 1240'),
('7c19cf80-7d0c-4a38-857f-fb7907f6f93c', '3d4dd01e-42bc-41b7-8015-9c5d8afc8f1e', '/uploads/productimagecatalogues/1731893093911-12in 1254 cone up.webp', '2024-11-28 03:32:11.124', '2024-11-28 03:32:11.124', 'Side Top'),
('7e907ca4-65cf-4dc4-9e29-5b6bd9da85b7', 'b4e5347e-fd18-4b47-a74a-6d90c6e0c305', '/uploads/productimagecatalogues/1731893145983-8in 854 Prestige magnet chasis.webp', '2024-11-28 03:32:29.306', '2024-11-28 03:32:29.306', 'Side Bottom'),
('7f9551a1-c34d-4afa-ab44-5d5a145a8168', 'c52ce46f-89a5-4576-a4fd-8a7ae5cf1f53', '/uploads/productimagecatalogues/1731893028894-15in LG 1596 chasis.jpg.webp', '2024-11-28 03:20:58.025', '2024-11-28 03:20:58.025', 'Side'),
('8096f421-2607-45df-b629-d0115b3caf4f', '6f3b950d-f94f-4c21-8e42-7e05251434b4', '/uploads/productimagecatalogues/1732254432264-12in LG 1295-2 Mk1 Magnet.webp', '2024-11-28 03:19:37.776', '2024-11-28 03:19:37.776', 'Bottom'),
('814d95cd-e71b-4eef-9da5-537dc8b7b498', '970f6aa5-91f5-464c-96e4-83f86280d053', '/uploads/productimagecatalogues/1731892992721-6.5in LG 6521 cone.webp', '2024-12-09 08:59:53.445', '2024-12-09 08:59:53.445', 'Top'),
('83701f25-671a-4d84-bd82-377fc54251e8', 'e8b1b732-196b-4f84-9f7a-a4b24f28c521', '/uploads/productimagecatalogues/1745799609540-1240 cone.webp', '2025-04-28 00:20:11.189', '2025-04-28 00:20:11.189', 'Cone 1240'),
('84f1a576-30ad-4d66-b280-6b327c37a1c5', '77932324-df07-44d8-84d2-30af8ae38c0a', '/uploads/productimagecatalogues/1732254833647-12in LG 1238-2 LEGACY ENERGY Cone.webp', '2024-12-09 08:59:16.262', '2024-12-09 08:59:16.262', 'Top'),
('8640c0ec-6055-49b2-842a-2d0d43a8896e', '96f6309b-96d1-466f-9dbb-bff04e8e1fac', '/uploads/productimagecatalogues/1731895876866-4in BST 1023 Dual Cone Magnet.webp', '2024-12-09 08:56:57.104', '2024-12-09 08:56:57.104', 'Bottom'),
('8787ed09-aa2c-4fe3-955a-686763e61344', '3213ef26-e2ab-4332-8d12-6ad1f18f39a2', '/uploads/productimagecatalogues/1731893197719-4in 8347 BH Chasis.webp', '2024-11-28 03:33:43.389', '2024-11-28 03:33:43.389', 'Side'),
('8878b085-8808-4cd4-80e6-2f67c499a89b', 'e8b1b732-196b-4f84-9f7a-a4b24f28c521', '/uploads/productimagecatalogues/1745799609391-1040 cone.webp', '2025-04-28 00:20:11.188', '2025-04-28 00:20:11.188', 'Cone 1040'),
('88ef318a-5660-44d1-9984-b08d0f34d0bd', '58e4147b-93a0-4809-955d-d04ce1161c5e', '/uploads/productimagecatalogues/1733969593080-1277-2 chassis.webp', '2024-12-13 00:50:52.326', '2024-12-13 00:50:52.326', 'Side'),
('8a47dcda-ec1a-483c-aa92-5ab4f1eb893e', '42802840-d898-46ea-8377-7e0a9b6a060f', '/uploads/productimagecatalogues/1731395570133-pg 1054 2 cone.webp', '2024-11-28 03:31:53.137', '2024-11-28 03:31:53.137', 'Top'),
('8a57e797-817e-4b55-bd4a-0d9ad228d696', '164c19d2-170f-4b48-958e-68ec335392f0', '/uploads/productimagecatalogues/1731894853895-5in-BST-522-Mk3-Chassis.webp', '2024-12-09 08:58:33.637', '2024-12-09 08:58:33.637', 'Side'),
('8ac08b86-617a-4184-a275-53044b28c998', 'fdd744f3-a65e-4c33-b2b6-81306f7b47f8', '/uploads/productimagecatalogues/1732254879545-12in LG-12385-2 SPARTA Chasis.webp', '2024-12-09 08:59:35.583', '2024-12-09 08:59:35.583', 'Side Bottom'),
('8b1a4a29-f941-4432-9df5-2ea4d6ead2a5', '77932324-df07-44d8-84d2-30af8ae38c0a', '/uploads/productimagecatalogues/1732254833719-12in LG 1238-2 LEGACY ENERGY Magnet.webp', '2024-12-09 08:59:16.262', '2024-12-09 08:59:16.262', 'Bottom'),
('8cd2709f-4835-4391-ba8e-d252291d0dfe', 'bd5ecf65-04d8-4b4d-813b-cffd8748b0fa', '/uploads/productimagecatalogues/1733969545241-8in LG-838-2-Mk1 Magnet.webp', '2024-12-12 02:13:24.823', '2024-12-12 02:13:24.823', 'Bottom'),
('8e4c90bb-2e59-49f2-b0c2-7adcb0188373', 'bd5ecf65-04d8-4b4d-813b-cffd8748b0fa', '/uploads/productimagecatalogues/1733969545161-8in LG-838-2-Mk1 Cone.webp', '2024-12-12 02:13:24.823', '2024-12-12 02:13:24.823', 'Top'),
('8e88335a-e126-4c1f-bb64-95e7311e9755', '4899e144-b93b-446a-89b4-b055230545ee', '/uploads/productimagecatalogues/1731395653183-10in LG-1098-2 cone.webp', '2024-11-28 03:12:45.627', '2024-11-28 03:12:45.627', 'Top'),
('95f966b9-1fa8-4035-942c-fbf4b233a179', 'b912e31b-58aa-4b51-a7d2-f1b80ebdfc0d', '/uploads/productimagecatalogues/1732254591616-12in LG 1292-2.webp', '2024-11-28 03:19:22.605', '2024-11-28 03:19:22.605', 'Top'),
('9c506552-6aab-4f5d-9da5-bf10f16f1434', 'bd5ecf65-04d8-4b4d-813b-cffd8748b0fa', '/uploads/productimagecatalogues/1733969545198-8in LG-838-2-Mk1 Chasis.webp', '2024-12-12 02:13:24.823', '2024-12-12 02:13:24.823', 'Side'),
('9c7bdb7f-d5a1-4fd1-b9d1-b80ffa21e175', '2b1193f0-37cb-4576-9bfc-028cd5694d0e', '/uploads/productimagecatalogues/1731395912647-12in LG 1299 chassis.webp', '2024-11-28 03:20:43.407', '2024-11-28 03:20:43.407', 'Side'),
('9f72f8e5-0f77-400c-bd68-b5972ac8ac45', '745f44c7-888c-4919-832c-99fb176ff0fa', '/uploads/productimagecatalogues/1731395194678-LG 138 single slanted.webp', '2024-11-28 03:31:33.789', '2024-11-28 03:31:33.789', 'Side'),
('a05090ab-99ba-4b4d-8d13-d345083fdee2', '8c29e60a-34c0-4b99-b9bf-104be2655e65', '/uploads/productimagecatalogues/1731395725627-10in 1096-Mk1 cone.webp', '2024-12-09 09:00:42.291', '2024-12-09 09:00:42.291', 'Top'),
('a0f1add5-07dd-46c6-a330-a937520ee587', '4899e144-b93b-446a-89b4-b055230545ee', '/uploads/productimagecatalogues/1731395653287-10in LG-1098-2 magnet top.webp', '2024-11-28 03:12:45.627', '2024-11-28 03:12:45.627', 'Bottom'),
('a5568e62-6c99-4eee-bec2-a29b3de52bc2', '7a0b71f7-4400-4318-af0e-fc23c27171d1', '/uploads/productimagecatalogues/1731892945544-4in BST 422 Magnet.webp', '2024-12-09 08:58:52.970', '2024-12-09 08:58:52.970', 'Side'),
('a63b41c6-a3bf-45e0-8512-faf8b7e7192a', 'b9658a8b-77d9-4e00-8e0a-99b52fb1fad4', '/uploads/productimagecatalogues/1732765167306-BST 1614 cone.webp', '2024-12-09 08:58:14.315', '2024-12-09 08:58:14.315', 'Top'),
('a737507a-09bc-434d-8482-061caa9da327', '42802840-d898-46ea-8377-7e0a9b6a060f', '/uploads/productimagecatalogues/1731895110001-pg 1054 2 cone up.webp', '2024-11-28 03:31:53.137', '2024-11-28 03:31:53.137', 'Side Top'),
('a916085b-a5a5-4f2e-a531-bbb3343cc7d8', '69db9385-8c1f-4863-a07d-30e3fc952ec6', '/uploads/productimagecatalogues/1731395976953-6in 638 cone.webp', '2024-11-28 03:23:18.530', '2024-11-28 03:23:18.530', 'Top'),
('aabf309e-6a33-4adb-a462-92b4d0ebed5e', 'cc2d7eb7-526f-4ffe-923d-4b6c57fb9006', '/uploads/productimagecatalogues/1734055213596-10in LG 10385 chassis.webp', '2024-12-17 05:55:19.913', '2024-12-17 05:55:19.913', 'Side'),
('abb87e75-92aa-48b9-b4f5-c043b1a313cb', '3d4dd01e-42bc-41b7-8015-9c5d8afc8f1e', '/uploads/productimagecatalogues/1731893093952-12in 1254 chasis.webp', '2024-11-28 03:32:11.124', '2024-11-28 03:32:11.124', 'Side Bottom'),
('b1048a23-186a-4a21-84ac-9ce920209209', 'bfef1a40-3cc6-4bc0-85dc-12501e9c8b8a', '/uploads/productimagecatalogues/1731893247212-4in 8347 KH Chasis.webp', '2024-11-28 03:34:00.594', '2024-11-28 03:34:00.594', 'Side'),
('b2b6d407-6e4c-4ecc-9f29-607dd3c71d90', 'e8b1b732-196b-4f84-9f7a-a4b24f28c521', '/uploads/productimagecatalogues/1745799609491-1040 chasis jejeg.webp', '2025-04-28 00:20:11.189', '2025-04-28 00:20:11.189', '1040 Tampak Samping'),
('bc1f6c18-37ef-42b3-a3b6-d09fd270cd5a', '164c19d2-170f-4b48-958e-68ec335392f0', '/uploads/productimagecatalogues/1731894853846-5in-BST-522-Mk3-Cone-no-magnet.webp', '2024-12-09 08:58:33.637', '2024-12-09 08:58:33.637', 'Top No Magnet'),
('bc939b31-8b0c-4fbf-8dc9-2f69c7ff6dee', '498bc88a-d5e6-4314-ad72-499ea3f1f780', '/uploads/productimagecatalogues/1732254362121-12in LG 1298-2 Cone.webp', '2024-11-28 03:20:26.643', '2024-11-28 03:20:26.643', 'Top'),
('bd459b48-cdb8-47de-8860-2a8ae058b07a', 'b912e31b-58aa-4b51-a7d2-f1b80ebdfc0d', '/uploads/productimagecatalogues/1732254591722-12in LG 1292-2 chasis.webp', '2024-11-28 03:19:22.605', '2024-11-28 03:19:22.605', 'Side Bottom'),
('beedff2a-8e01-4c3a-95ce-bc7b9883e14c', '58e4147b-93a0-4809-955d-d04ce1161c5e', '/uploads/productimagecatalogues/1733969593035-1277-2 cone.webp', '2024-12-13 00:50:52.326', '2024-12-13 00:50:52.326', 'Top'),
('bf0b690c-71dd-40f7-b8e6-1a4815742677', '970f6aa5-91f5-464c-96e4-83f86280d053', '/uploads/productimagecatalogues/1731892992769-6.5in LG 6521 chassis.webp', '2024-12-09 08:59:53.445', '2024-12-09 08:59:53.445', 'Side'),
('c3869c82-47dc-4f05-b5a6-cf35b44ebe3f', '7a0b71f7-4400-4318-af0e-fc23c27171d1', '/uploads/productimagecatalogues/1731892945489-4in BST 422 Cone.webp', '2024-12-09 08:58:52.970', '2024-12-09 08:58:52.970', 'Top'),
('c7f4a2a4-2dfb-43cc-b6cb-90b29f18304e', '3d4dd01e-42bc-41b7-8015-9c5d8afc8f1e', '/uploads/productimagecatalogues/1731893093863-12in 1254 cone.webp', '2024-11-28 03:32:11.124', '2024-11-28 03:32:11.124', 'Top'),
('c99d1a0f-854f-46bc-8dfe-fc92fe3a9df4', '498bc88a-d5e6-4314-ad72-499ea3f1f780', '/uploads/productimagecatalogues/1732254362224-12in LG 1298-2 Chasis.webp', '2024-11-28 03:20:26.644', '2024-11-28 03:20:26.644', 'Side Bottom'),
('ca10c601-cc32-4907-a0f1-d6a08d3b858a', '164c19d2-170f-4b48-958e-68ec335392f0', '/uploads/productimagecatalogues/1731894853935-5in-BST-522-Mk3-Cone.webp', '2024-12-09 08:58:33.637', '2024-12-09 08:58:33.637', 'Top'),
('cc5478bd-ce05-4749-ae1b-39eac24ad4cc', '96f6309b-96d1-466f-9dbb-bff04e8e1fac', '/uploads/productimagecatalogues/1731895876772-4in BST 1023 Dual Cone.webp', '2024-12-09 08:56:57.104', '2024-12-09 08:56:57.104', 'Top'),
('d215af00-abae-4ae5-8f57-df9cf34be82a', '58e4147b-93a0-4809-955d-d04ce1161c5e', '/uploads/productimagecatalogues/1733969593117-1277-2 magnet.webp', '2024-12-13 00:50:52.326', '2024-12-13 00:50:52.326', 'Bottom'),
('d326a4cc-e3e9-44d2-951a-f38a2077cfb5', 'ad3d4329-2433-42aa-8b0e-542a474f1c91', '/uploads/productimagecatalogues/1732254773448-6.5in BST 615 Mk3 Chasis.webp', '2024-12-09 08:57:50.383', '2024-12-09 08:57:50.383', 'Side Bottom'),
('da1b59c9-6588-41eb-8789-f9ff44f42377', 'b4e5347e-fd18-4b47-a74a-6d90c6e0c305', '/uploads/productimagecatalogues/1731893145918-8in 854 Prestige cone.webp', '2024-11-28 03:32:29.306', '2024-11-28 03:32:29.306', 'Top'),
('da77d9cc-771d-41f6-969a-0011a65fd9cb', 'c2abeea1-3c8d-4900-af2a-6fcb27bcb738', '/uploads/productimagecatalogues/1732254500527-12in LG-12386-2 SPARTA Cone.webp', '2024-11-28 03:25:39.986', '2024-11-28 03:25:39.986', 'Top'),
('dc1bc55a-8746-42c2-881a-0da27730ba3d', '96f6309b-96d1-466f-9dbb-bff04e8e1fac', '/uploads/productimagecatalogues/1731895876917-4in BST 1023 Dual Cone Chasis.webp', '2024-12-09 08:56:57.104', '2024-12-09 08:56:57.104', 'Side'),
('ddc3cbd9-41bd-41bc-80a4-113e59931f36', 'ad3d4329-2433-42aa-8b0e-542a474f1c91', '/uploads/productimagecatalogues/1732254773400-6.5in BST 615 Mk3 Magnet .webp', '2024-12-09 08:57:50.383', '2024-12-09 08:57:50.383', 'Bottom'),
('e1e29215-aae3-4f9e-bac6-38f215ad7290', 'ad3d4329-2433-42aa-8b0e-542a474f1c91', '/uploads/productimagecatalogues/1732254773276-6.5in BST 615 Mk3 Cone 2.webp', '2024-12-09 08:57:50.383', '2024-12-09 08:57:50.383', 'Top'),
('e859399d-0d7c-4f4d-a9c8-9a563429dc7e', 'e8b1b732-196b-4f84-9f7a-a4b24f28c521', '/uploads/productimagecatalogues/1745799609446-1040 chasis.webp', '2025-04-28 00:20:11.189', '2025-04-28 00:20:11.189', 'Chassis 1040'),
('e9cefa5d-37a6-49e3-a76b-8159c5443189', 'ad3d4329-2433-42aa-8b0e-542a474f1c91', '/uploads/productimagecatalogues/1732254773335-6.5in BST 615 Mk3 Cone 1.webp', '2024-12-09 08:57:50.383', '2024-12-09 08:57:50.383', 'Top Without Mesh'),
('eb8e44ef-e418-40ea-a0ee-3710c36f2059', '95bba079-4da5-4ac3-8a9a-9fdf23f146b7', '/uploads/productimagecatalogues/1730865885624-1727678256663-lg-696-2-chassis-1024x849.webp', '2024-11-28 03:22:07.574', '2024-11-28 03:22:07.574', 'Side'),
('ee673007-a00a-496c-b83c-4f835de1fe0a', '55fd0ddf-cd00-45a1-8ee0-6fd4231bd69e', '/uploads/productimagecatalogues/1731395849696-8in LG 896 chassis.webp', '2024-11-28 03:22:53.637', '2024-11-28 03:22:53.637', 'Side'),
('f32f3706-1d7e-4a8f-9773-037525cd5f07', 'e3770df5-ea15-4be2-85f5-703caecdfd36', '/uploads/productimagecatalogues/1731395781275-1095-2 Mk1 Magnet.webp', '2024-12-13 01:59:24.739', '2024-12-13 01:59:24.739', 'Bottom'),
('f3eed289-9f2a-453a-bdc3-f1a9d122bf43', 'c52ce46f-89a5-4576-a4fd-8a7ae5cf1f53', '/uploads/productimagecatalogues/1731893028848-15in LG 1596 cone.jpg.webp', '2024-11-28 03:20:58.025', '2024-11-28 03:20:58.025', 'Top'),
('fb745639-bc08-4f34-9594-a50294d896bb', 'e8b1b732-196b-4f84-9f7a-a4b24f28c521', '/uploads/productimagecatalogues/1745799609589-1240 chasis.JPG.webp', '2025-04-28 00:20:11.189', '2025-04-28 00:20:11.189', 'Chassis 1240'),
('feab07bb-5a99-4743-9f11-87683de19751', '2b1193f0-37cb-4576-9bfc-028cd5694d0e', '/uploads/productimagecatalogues/1731395912610-12in LG 1299 magnet.webp', '2024-11-28 03:20:43.407', '2024-11-28 03:20:43.407', 'Top'),
('fec3bd9b-f488-40b2-ae9d-26847dd4dc57', 'c2abeea1-3c8d-4900-af2a-6fcb27bcb738', '/uploads/productimagecatalogues/1732254500633-12in LG-12386-2 SPARTA chasis.webp', '2024-11-28 03:25:39.986', '2024-11-28 03:25:39.986', 'Side Bottom');

-- --------------------------------------------------------

--
-- Table structure for table `impedance_image`
--

CREATE TABLE `impedance_image` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `url` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `impedance_image`
--

INSERT INTO `impedance_image` (`id`, `productId`, `url`, `createdAt`, `updatedAt`) VALUES
('0b791520-0984-42b9-8ca5-e92981691b5a', 'e3770df5-ea15-4be2-85f5-703caecdfd36', '/uploads/productfrequencyresponse/1731395781127-10in 1095-2 Mk1 Impedansi.webp', '2024-12-13 01:59:24.740', '2024-12-13 01:59:24.740'),
('0c5942b5-3e7b-452d-b9cf-fe32c3150208', '5fa5a613-16a3-4b8f-92c6-dd2bd7b68f8b', '/uploads/productfrequencyresponse/1732254649047-1077 Impedansi.webp', '2024-11-28 03:10:43.882', '2024-11-28 03:10:43.882'),
('15007fcd-ad94-46d7-b835-96b1a825ed66', 'ad3d4329-2433-42aa-8b0e-542a474f1c91', '/uploads/productfrequencyresponse/1733734670172-6.5in BST 615 Mk3 Impedansi .webp', '2024-12-09 08:57:50.384', '2024-12-09 08:57:50.384'),
('17536563-bd71-4744-9bd7-d3f82527d6e8', 'c2abeea1-3c8d-4900-af2a-6fcb27bcb738', '/uploads/productfrequencyresponse/1732254500455-12386 Impedansi.webp', '2024-11-28 03:25:39.987', '2024-11-28 03:25:39.987'),
('2e030fc1-d7dc-4278-9802-c548d65a852e', 'c52ce46f-89a5-4576-a4fd-8a7ae5cf1f53', '/uploads/productfrequencyresponse/1732254129201-15in LG 1596 cone Impedansi.webp', '2024-11-28 03:20:58.025', '2024-11-28 03:20:58.025'),
('2fcecf55-170d-4aa1-a8ce-58c372b62af0', '69db9385-8c1f-4863-a07d-30e3fc952ec6', '/uploads/productfrequencyresponse/1731395976897-6in 638 Impedansi.webp', '2024-11-28 03:23:18.530', '2024-11-28 03:23:18.530'),
('3379ab97-9ac0-4f1e-8528-df82a2cd127b', 'bd5ecf65-04d8-4b4d-813b-cffd8748b0fa', '/uploads/productfrequencyresponse/1733969545112-8in LG-838-2-Mk1 Impedansi.webp', '2024-12-12 02:13:24.823', '2024-12-12 02:13:24.823'),
('40dad592-db06-432b-b6c1-f0a04e88a1c5', '6f3b950d-f94f-4c21-8e42-7e05251434b4', '/uploads/productfrequencyresponse/1732254432119-1295 Impedansi.webp', '2024-11-28 03:19:37.776', '2024-11-28 03:19:37.776'),
('41c68a8d-543a-4c5c-aa82-751e56943755', '498bc88a-d5e6-4314-ad72-499ea3f1f780', '/uploads/productfrequencyresponse/1732254362066-12in LG 1298-2 Impedansi.webp', '2024-11-28 03:20:26.644', '2024-11-28 03:20:26.644'),
('52510753-776f-4916-93a9-1a8bc9c08093', '2b1193f0-37cb-4576-9bfc-028cd5694d0e', '/uploads/productfrequencyresponse/1731395912545-impedansi LG 1299.webp', '2024-11-28 03:20:43.408', '2024-11-28 03:20:43.408'),
('5809b6d8-8fc5-41d6-9f1f-4b22d6f9bdae', '963116bc-4fef-48ae-a8e6-f655be756dc7', '/uploads/productfrequencyresponse/1733734816452-12in LG 1296-2 Mk1 Impedansi.webp', '2024-12-09 09:00:16.592', '2024-12-09 09:00:16.592'),
('5b540553-1de8-478c-8311-37539866d6a7', 'b4e5347e-fd18-4b47-a74a-6d90c6e0c305', '/uploads/productfrequencyresponse/1731893145861-8in 854 Prestige Impedansi.webp', '2024-11-28 03:32:29.306', '2024-11-28 03:32:29.306'),
('7a2efb7d-7e36-4aca-b1c2-058678e87708', '55fd0ddf-cd00-45a1-8ee0-6fd4231bd69e', '/uploads/productfrequencyresponse/1731395849596-8in LG 896 Impedansi.webp', '2024-11-28 03:22:53.638', '2024-11-28 03:22:53.638'),
('7e2211e5-6f25-41c6-8d26-831093c948c2', 'b912e31b-58aa-4b51-a7d2-f1b80ebdfc0d', '/uploads/productfrequencyresponse/1732254591559-1292 Impedansi.webp', '2024-11-28 03:19:22.606', '2024-11-28 03:19:22.606'),
('7e6820d8-8417-48ac-8820-73ee3293719f', 'cc2d7eb7-526f-4ffe-923d-4b6c57fb9006', '/uploads/productfrequencyresponse/1733734591556-10385 Impedansi.webp', '2024-12-17 05:55:19.914', '2024-12-17 05:55:19.914'),
('7f6cde94-e5e6-41f5-bebe-595fdd201ab4', '3d4dd01e-42bc-41b7-8015-9c5d8afc8f1e', '/uploads/productfrequencyresponse/1731893093814-12in PG 1254 Impedansi.webp', '2024-11-28 03:32:11.124', '2024-11-28 03:32:11.124'),
('84119fff-c3ee-4059-ac4c-27fb70a7c3c0', '7a0b71f7-4400-4318-af0e-fc23c27171d1', '/uploads/productfrequencyresponse/1733734732824-4in BST 422 Impedansi.webp', '2024-12-09 08:58:52.970', '2024-12-09 08:58:52.970'),
('878df745-ae20-408d-9b08-2ed167cd9492', '4899e144-b93b-446a-89b4-b055230545ee', '/uploads/productfrequencyresponse/1731395653141-1098 impedansi.webp', '2024-11-28 03:12:45.628', '2024-11-28 03:12:45.628'),
('a4929b8f-91ac-46d3-be1e-47b8e9bc13d7', '96f6309b-96d1-466f-9dbb-bff04e8e1fac', '/uploads/productfrequencyresponse/1733734616964-4in BST 1023 Dual Cone Impedansi.webp', '2024-12-09 08:56:57.104', '2024-12-09 08:56:57.104'),
('a6448519-34a0-420f-9d5a-d075d226ae4d', '95bba079-4da5-4ac3-8a9a-9fdf23f146b7', '/uploads/productfrequencyresponse/1727919169341-6in-LG-696-2-LEGACY-Impedansi-1024x597.webp', '2024-11-28 03:22:07.574', '2024-11-28 03:22:07.574'),
('af672782-c4b5-4d2c-9200-443b04f71f0f', 'fdd744f3-a65e-4c33-b2b6-81306f7b47f8', '/uploads/productfrequencyresponse/1733734775420-12in LG-12385-2 SPARTA Impedansi.webp', '2024-12-09 08:59:35.585', '2024-12-09 08:59:35.585'),
('afd653d2-6553-48de-a6a0-8683d9892606', '164c19d2-170f-4b48-958e-68ec335392f0', '/uploads/productfrequencyresponse/1733734713501-5in BST 522 Mk3 Impedansi.webp', '2024-12-09 08:58:33.638', '2024-12-09 08:58:33.638'),
('b111bc08-1c5b-4b24-bb49-3d4710705a26', '58e4147b-93a0-4809-955d-d04ce1161c5e', '/uploads/productfrequencyresponse/1733969592976-1277-2 Impedansi.webp', '2024-12-13 00:50:52.328', '2024-12-13 00:50:52.328'),
('b409e235-e607-4c98-9350-846a023f9f96', '77932324-df07-44d8-84d2-30af8ae38c0a', '/uploads/productfrequencyresponse/1733734756120-12in LG 1238-2 LEGACY Impedansi.webp', '2024-12-09 08:59:16.263', '2024-12-09 08:59:16.263'),
('d346af6f-51eb-43e2-8876-d15463d2e7af', 'b9658a8b-77d9-4e00-8e0a-99b52fb1fad4', '/uploads/productfrequencyresponse/1733734694153-BST 1614 Impedansi.webp', '2024-12-09 08:58:14.316', '2024-12-09 08:58:14.316'),
('e132932d-5286-4b2c-8349-e477b042ab36', '42802840-d898-46ea-8377-7e0a9b6a060f', '/uploads/productfrequencyresponse/1731895109922-pg 1054 2 Impedansi.webp', '2024-11-28 03:31:53.137', '2024-11-28 03:31:53.137'),
('ef3ebb8f-13ee-4ebf-ac69-1c97b543b61c', '41a41be4-0044-4958-b270-7afa8207446c', '/uploads/productfrequencyresponse/1733734644011-6X9in BST 6981 Mk1 Impedansi.webp', '2024-12-09 08:57:24.171', '2024-12-09 08:57:24.171'),
('fcb59f27-e9a4-406c-a2c7-6d26a150032b', '8c29e60a-34c0-4b99-b9bf-104be2655e65', '/uploads/productfrequencyresponse/1733734842132-1096-2 Impedansi.webp', '2024-12-09 09:00:42.292', '2024-12-09 09:00:42.292'),
('fdf81100-11b2-45a9-8dda-196c34dd22b5', '970f6aa5-91f5-464c-96e4-83f86280d053', '/uploads/productfrequencyresponse/1733734793305-6.5in LG 6521 Impedansi.webp', '2024-12-09 08:59:53.446', '2024-12-09 08:59:53.446');

-- --------------------------------------------------------

--
-- Table structure for table `multipledatasheetproduct`
--

CREATE TABLE `multipledatasheetproduct` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `url` text NOT NULL DEFAULT '',
  `name` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `multipledatasheetproduct`
--

INSERT INTO `multipledatasheetproduct` (`id`, `productId`, `url`, `name`) VALUES
('015a1b88-cf9b-4bce-892c-033c261381fd', 'b912e31b-58aa-4b51-a7d2-f1b80ebdfc0d', '/uploads/productdatasheet/1727255154899-44.pdf', '12\" LG 1292-2 Datasheet'),
('08b5d53b-3e98-4a28-808d-8c5bcd2fbd11', 'b9658a8b-77d9-4e00-8e0a-99b52fb1fad4', '/uploads/productdatasheet/1727312633140-58.pdf', '6.5\" BST 1614 Datasheet'),
('0f27c649-4dc2-450d-8270-c636bc48c80b', '55fd0ddf-cd00-45a1-8ee0-6fd4231bd69e', '/uploads/productdatasheet/1727255648310-24.pdf', '8\" LG 896-2 Datasheet'),
('1a376853-a4e3-4f41-9e69-4dd03c37b9fe', '62a47bd6-a0c2-4df9-9cd0-21c496076a5a', '/uploads/productdatasheet/1727254278296-26.pdf', ' 10\" LG 1038-2 Datasheet'),
('2a0de7bd-58f9-45dc-8f1e-a5ef96fa6916', 'cc2d7eb7-526f-4ffe-923d-4b6c57fb9006', '/uploads/productdatasheet/1727254349564-70 (1).pdf', '10\" LG 10385-2 Datasheet'),
('32088747-c9ad-4fa2-8e7d-058a3dc24d9e', '69db9385-8c1f-4863-a07d-30e3fc952ec6', '/uploads/productdatasheet/1727255488740-23.pdf', '6\" LG 638-2 MK1 Datasheet'),
('372816ee-2be3-4a81-b16c-b86564e42e50', '41a41be4-0044-4958-b270-7afa8207446c', '/uploads/productdatasheet/1727312749259-60.pdf', '6X9\" BST 6981 MK1 Datasheet'),
('3ef0bd58-5052-491d-9bdb-538025a14d96', '42802840-d898-46ea-8377-7e0a9b6a060f', '/uploads/productdatasheet/1727312076466-51.pdf', '10\" PG 1054-2 RED Datasheet'),
('42961afe-14c0-413a-9774-c27fbcbdc866', 'bd5ecf65-04d8-4b4d-813b-cffd8748b0fa', '/uploads/productdatasheet/1727255601836-25.pdf', '8\" LG 838-2 MK1 Datasheet'),
('49cf2b45-2bb1-4917-b64a-8c8f2e33750b', 'fdd744f3-a65e-4c33-b2b6-81306f7b47f8', '/uploads/productdatasheet/1727253767854-71.pdf', '12\" LG 12385-2 Datasheet'),
('52d1de81-2a61-4d46-9de7-74dc261d0b6a', '3d4dd01e-42bc-41b7-8015-9c5d8afc8f1e', '/uploads/productdatasheet/1727312129391-52.pdf', '12\" PG 1254-2 RED Datasheet'),
('5395a3c1-81b2-4adc-bee8-4f9ae6bc73c6', 'c2abeea1-3c8d-4900-af2a-6fcb27bcb738', '/uploads/productdatasheet/1727255019585-72.pdf', '12\" LG 12386-2 Datasheet'),
('54ba7ad6-0318-49d7-ae2c-d17f84fe23f7', 'b4e5347e-fd18-4b47-a74a-6d90c6e0c305', '/uploads/productdatasheet/1727312262451-50 (1).pdf', '8\" PG 854-2 RED Datasheet'),
('5acbb1d6-7d67-4a8f-b26e-2144687ecf8e', '498bc88a-d5e6-4314-ad72-499ea3f1f780', '/uploads/productdatasheet/1727255321224-40.pdf', '12\" LG 1298-2 Datasheet'),
('63e80bc2-487b-4711-a13a-dd67a8064a6b', '6f3b950d-f94f-4c21-8e42-7e05251434b4', '/uploads/productdatasheet/1727255210791-36.pdf', '12\" LG 1295-2 MK1 Datasheet'),
('64e4f0af-c378-4573-b229-84dabea5fd25', '78c76b38-9464-446b-ad93-2a10560d25b8', '/uploads/productdatasheet/1728015452631-73.pdf', '10\" LG 10352 Datasheet'),
('6f48c18f-b0f7-4b68-8ab5-a5354f9943be', 'c0118d2b-ca07-4d5d-9819-42b1fdc27655', '/uploads/productdatasheet/1727312807748-63.pdf', 'PG 298 Datasheet'),
('71d78c00-cf95-4f2f-9018-38c14d3aff8a', '5fa5a613-16a3-4b8f-92c6-dd2bd7b68f8b', '/uploads/productdatasheet/1727254417455-33.pdf', ' 10\" LG 1077-2 Datasheet'),
('71e8834c-f64a-4a3a-aabc-da054643e67d', 'e3770df5-ea15-4be2-85f5-703caecdfd36', '/uploads/productdatasheet/1727254557795-29.pdf', ' 10\" LG 1095-2-MK1 Datasheet'),
('761f5fcf-eb77-4d07-92cf-fb3f81132b31', '96f6309b-96d1-466f-9dbb-bff04e8e1fac', '/uploads/productdatasheet/1727312865472-85.pdf', '4\" BST 1023 Dual Datasheet'),
('7718258c-aeac-4e68-a27b-a086a6c08110', '2e888496-0048-4943-982f-ebfdd4625e1f', '/uploads/productdatasheet/1727254194911-69.pdf', '10\" LG 1009-2 Datasheet'),
('8b5d09aa-6404-43dd-997d-984f07fbea73', '58e4147b-93a0-4809-955d-d04ce1161c5e', '/uploads/productdatasheet/1727255083049-43.pdf', '12\" LG 1277-2 Datasheet'),
('99469361-99a3-426d-95d7-0bda67cd747a', '970f6aa5-91f5-464c-96e4-83f86280d053', '/uploads/productdatasheet/1727311675936-79.pdf', '6.5\" LG-6521 Datasheet'),
('9c87d463-2b2d-4438-bc68-a17822e99c13', '7a0b71f7-4400-4318-af0e-fc23c27171d1', '/uploads/productdatasheet/1727312451782-77.pdf', '4\" BST 422 MK3 Datasheet'),
('afcf494f-595b-48a8-9675-ef301adb9d18', '164c19d2-170f-4b48-958e-68ec335392f0', '/uploads/productdatasheet/1727312589593-78.pdf', '5\" BST 522 MK3 Datasheet'),
('b8dcc9d2-7783-4608-bd84-ce25abea674f', '4899e144-b93b-446a-89b4-b055230545ee', '/uploads/productdatasheet/1727254846131-48.pdf', ' 10\" LG 1098-2 SILVER Datasheet'),
('bf404099-f4ab-4580-843e-f99436473984', '95bba079-4da5-4ac3-8a9a-9fdf23f146b7', '/uploads/productdatasheet/1727255542453-22.pdf', '6\" LG 696-2 Datasheet'),
('bf9cb08e-9997-4977-9527-7c81b5ae91a5', 'c52ce46f-89a5-4576-a4fd-8a7ae5cf1f53', '/uploads/productdatasheet/1727255434063-45.pdf', '15\" LG 1596-2 Datasheet'),
('bfd23f76-187f-4c4f-9c9d-52e925b1467e', '77932324-df07-44d8-84d2-30af8ae38c0a', '/uploads/productdatasheet/1727254896795-35.pdf', ' 12\" LG 1238-2 Datasheet'),
('c0c0cee8-17c3-401d-9e95-7482ded0915c', '2b1193f0-37cb-4576-9bfc-028cd5694d0e', '/uploads/productdatasheet/1727255378892-87.pdf', '12\" LG 1299-2-Mk1 Datasheet'),
('c55e5b8b-4fb8-4a97-9575-3824dd594a5c', '8c29e60a-34c0-4b99-b9bf-104be2655e65', '/uploads/productdatasheet/1727254786550-30.pdf', '10\" LG 1096-2-MK1 Datasheet'),
('d3651f29-dc26-4d9c-ab8c-d5614badcbce', 'ad3d4329-2433-42aa-8b0e-542a474f1c91', '/uploads/productdatasheet/1727312681219-76.pdf', '6.5\" BST 615 MK3 Datasheet'),
('e6ed0f58-e595-4b7d-8937-7d92e4b6ea9c', '963116bc-4fef-48ae-a8e6-f655be756dc7', '/uploads/productdatasheet/1727255258479-38.pdf', '12\" LG 1296-2 MK1 Datasheet');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` varchar(191) NOT NULL,
  `brandId` varchar(191) NOT NULL,
  `title` text NOT NULL,
  `slug` text NOT NULL,
  `description` text NOT NULL,
  `event_date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedBy` varchar(191) NOT NULL DEFAULT '',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `link_placeholder` text NOT NULL DEFAULT '',
  `link_url` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `brandId`, `title`, `slug`, `description`, `event_date`, `updatedBy`, `createdAt`, `updatedAt`, `link_placeholder`, `link_url`) VALUES
('2d535d4d-5ebd-496d-a705-976da157a9b0', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'SPEAKER MOBIL LIMITED EDITION KARYA ANAK BANGSA: 10in LG 1040 dan 12in LG 1240', 'speaker-mobil-limited-edition-karya-anak-bangsa-10in-lg-1040-dan-12in-lg-1240', '<p>Selama bertahun-tahun, Sinar Baja Electric mengeluarkan speaker mobil dengan bahan berkualitas dan suara yang jernih yang bisa didapatkan dari brand adalannya: Legacy Series. Dikenal luas lewat produk best sellernya yaitu 12in LG 1277-2, Legacy Series mengeluarkan serian Limited Editionnya sebanyak 2 tipe, yaitu 10in LG 1040 dan 12in LG 1240.</p><p>&nbsp;</p><p>Setiap tipe memiliki daya magnet yang optimal yang didapat dari hasil pengukuran FEA (Finite Element Analysis), sehingga menghasilkan suara treble lebih jernih. Bass yang dalam juga membantu meningkatkan pengalaman audio yang lebih imersif sehingga pelanggan merasakan seperti di tengah konser. Material conepaper yang dibuat dari bahan PP injection khusus memiliki daya tahan yang sangat tinggi terhadap perubahan cuaca. Dengan teknologi ini, speaker bisa digunakan diberbagai macam tempat yaitu di area indoor maupun outdoor, karena speaker ini akan tetap mengeluarkan kualitas suara yang prima. Keunggulan lain yang tidak kalah penting adalah motor didesain dengan ventilasi khusus sehingga tidak ada kompresi udara dan memberikan sirkulasi udara yang berfungsi sebagai pendingin. &nbsp;Dengan sistem ini, maka pengguna dapat menggunakan speaker ini dalam jangka waktu yang lama, dan kualitas suara tetap stabil walaupun dengan volume yang tinggi.</p><p></p><p><strong>Pentingnya Memilih Speaker Berkualitas Dari Indonesia</strong></p><p></p><p>Sinar Baja Electric (SBE) merupakan produsen loudspeaker lokal terbesar di Asia Tenggara. Dengan sertifikasi <strong>ISO 9001/TS 16949</strong>, SBE fokus pada speaker mobil&nbsp;berkualitas tinggi. Dengan tagline Legacy Speaker yaitu <strong><em>The Driving Force</em></strong>, perusahaan berkomitmen untuk selalu meningkatkan pengalaman berkendaran tidak akan didapat dari brand-brand lainnya.</p><p>&nbsp;</p><p>Dengan pabrik yang berlokasi di Surabaya ini, SBE memiliki keunggulan yang tidak dimiliki oleh brand-brand ternama lainnya, yaitu adanya fasilitas jasa servis yang melewati proses quality control yang sama seperti memproduksi produk baru.</p><p>&nbsp;</p><p>Pelanggan juga dapat membeli produk dari Sinar Baja Electric melalui dealer-dealer resmi SBE. Daftar dealer resmi tersedia di aplikasi My SBE, dan dapat diunduh di Play Store.</p>', '2025-04-30 09:05:27.889', 'admin', '2025-04-30 09:07:08.816', '2025-04-30 09:07:08.814', '', ''),
('2e4f6cbb-f4b5-47a4-b0a0-2f9342a9382d', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Undangan Kerjasama dengan Para Youtuber dan Tiktokers Sound Audio Se-Indonesia', 'undangan-kerjasama-dengan-para-youtuber-dan-tiktokers-sound-audio-se-indonesia', '<p>Tim Legacy membuka kesempatan kepada para Youtuber dan TikTokers seluruh Indonesia untuk mendapatkan speaker gratis dari Legacy untuk direview. Kami akan memilih para youtuber untuk mendapatkan kesempatan emas ini.</p><p>Berikut sistem kerjasamanya:</p><ul><li><p>Speaker yang diberikan tidak perlu dibeli, dan menjadi milik influencer yang bersangkutan</p></li><li><p>Biaya ongkir dari pabrik Sinar Baja Electric ke rumah Influencer ditanggung oleh Sinar Baja Electric</p></li></ul><p>Berikut syarat dan ketentuannya:</p><ul><li><p>Follow Youtube dan TikTok @acrspeaker-rhymeproaudio</p></li><li><p>Durasi video dan banyaknya part bebas (sekreatif dan semenarik mungkin)</p></li><li><p>Review speaker mirip dengan konten-konten dari influencer tersebut. Contoh: Jika isi konten mengenai review box dan tes suara, maka isi konten bisa ditambahkan penjelasan singkat tentang speaker yang kami kirimkan</p></li><li><p>Setelah mengupload video, mohon untuk menghubugi admin kembali untuk di-review dan di-upload di Instagram @legacy.speaker</p></li></ul><p>Berikut contoh Youtuber yang telah bekerjasama dengan kami:</p><ul><li><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://www.youtube.com/@jossaudio\">Joss Audio</a></p></li></ul><img src=\"/uploads/newsimages/1734425192313-joss.webp\"><ul><li><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://www.youtube.com/@Zacky_Audio88\">Zacky Audio</a></p><img src=\"/uploads/newsimages/1734425271436-zacky.webp\"></li></ul>', '2024-10-12 17:00:00.000', 'admin', '2024-10-16 00:53:00.087', '2024-12-17 08:48:44.913', '', ''),
('8a024495-c9e4-40b9-88b6-7fdaa8bbc209', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Merchandise Gratis untuk Youtuber Penikmat Audio Legacy', 'merchandise-gratis-untuk-youtuber-penikmat-audio-legacy', '<p>Tidak kalah dari brand-brand Sinar Baja Electric lainnya, Legacy juga membuat event khusus untuk para penikmat sound Legacy. Event ini diadakan sebagai bentuk apresiasi kepada para pecinta audio yang tetap setia menggunakan Legacy. Mereka bisa mendapatkan merchandise gratis dengan cara sebagai berikut:</p><ul><li><p>Follow instagram @legacy.speaker</p></li><li><p>Upload konten review mengenai produk Legacy di Youtube atau Tiktok semenarik dan sekreatif mungkin</p></li><li><p>Kirimkan link video ke tim Legacy melalui instagram @legacy.speaker beserta kelengkapan data untuk pengiriman merchandise (nama, alamat lengkap, kode pos, dan no hp)</p></li></ul><p>Event ini akan diadakan tiap bulan, dan konten yang mendapatkan merchandise adalah konten yang telah terupload sejak Januari 2023.</p>', '2024-12-16 17:00:00.000', 'admin', '2024-12-17 05:47:55.165', '2025-01-14 03:33:38.953', '', ''),
('db43cd12-32f3-4236-a9a3-d93ba0f5b222', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Langkah Mengikuti Undian Poin My SBE', 'langkah-mengikuti-undian-poin-my-sbe', '<p>Setelah keberhasilan acara Undian Poin My SBE 2023, event ini akan diadakan setiap tahun oleh tim ACR. Event ini diperuntukkan kepada konsumen lama dan konsumen baru jika membeli produk ACR, Legacy, Curve berdasarkan periode yang ditetapkan, maka bisa mendapatkan hadiah. Hadiah tersebut didapat dari poin-poin yang sudah dikumpulkan dengan cara sebagai berikut:</p><p></p><ul><li><p>Download app My SBE pada Play Store, lalu registrasi terlebih dahulu. Berikut <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://play.google.com/store/apps/details?id=id.sbe.mysbe.customer&amp;hl=id\">link app My SBE</a></p><img src=\"/uploads/newsimages/1734395172735-App-My-SBE-di-Playstore.jpg\"></li><li><p>Pada halaman Beranda klik “Pindai” dan scan QR-Code yang ada pada speaker ACR. QR-Code biasanya terletak pada magnet atau yoke speaker</p><img src=\"/uploads/newsimages/1734395208222-photo1693810641-1.jpeg\"><img src=\"/uploads/newsimages/1734395221064-z1.jpg\"></li><li><p>Lalu pilih toko pembelian</p><img src=\"/uploads/newsimages/1734395255184-Screenshot_2023_09_04_13_29_00_671_id_gits_sinarbajaelectric_customer-768x1511.jpg\"></li><li><p>Setelah memilih toko, maka akan muncul pop up message bahwa poin berhasil didapatkan. Banyaknya poin tergantung dari ukuran dan tipe speaker</p><img src=\"/uploads/newsimages/1734395288378-photo16938095671.jpeg\"></li><li><p>Jika QR Barcode sudah pernah discan sebelumnya maka akan muncul pop up message yang menyatakan voucher gagal di-scan</p><img src=\"/uploads/newsimages/1734395317133-photo1693809567.jpg\"></li><li><p>Poin yang berhasil didapatkan akan tersimpan pada “Poin Anda” di halaman Beranda. Untuk melihat riwayat scan, langsung klik pada kolom “Poin Anda”</p><img src=\"/uploads/newsimages/1734395340644-photo1692938364.jpg\"></li></ul>', '2024-12-16 17:00:00.000', 'admin', '2024-12-17 00:29:17.488', '2024-12-17 05:43:29.393', '-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `news_image`
--

CREATE TABLE `news_image` (
  `id` varchar(191) NOT NULL,
  `newsId` varchar(191) NOT NULL,
  `url` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `news_image`
--

INSERT INTO `news_image` (`id`, `newsId`, `url`, `createdAt`, `updatedAt`) VALUES
('1662082e-33d1-4a82-8739-bf92113ebe70', '2d535d4d-5ebd-496d-a705-976da157a9b0', '/uploads/newsimages/1746004026600-WhatsApp Image 2025-03-14 at 5.12.33 PM(1).webp', '2025-04-30 09:07:08.835', '2025-04-30 09:07:08.835'),
('2087f94c-c491-4825-9bf2-3bccf66857e5', '8a024495-c9e4-40b9-88b6-7fdaa8bbc209', '/uploads/newsimages/1734414474500-1729040004533-berita3.webp', '2025-01-14 03:33:38.958', '2025-01-14 03:33:38.958'),
('42956466-3302-4705-80a3-cf0c1b23bdcf', 'db43cd12-32f3-4236-a9a3-d93ba0f5b222', '/uploads/newsimages/1734414173133-1728983842508-berita1.webp', '2024-12-17 05:43:29.399', '2024-12-17 05:43:29.400'),
('56b7a292-c18d-4059-8354-ac7995c214c2', '2e4f6cbb-f4b5-47a4-b0a0-2f9342a9382d', '/uploads/newsimages/1729039980021-berita2.webp', '2024-12-17 08:48:44.957', '2024-12-17 08:48:44.957');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` varchar(191) NOT NULL,
  `brandId` varchar(191) NOT NULL,
  `name` text NOT NULL,
  `isFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `isArchived` tinyint(1) NOT NULL DEFAULT 0,
  `sizeId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `description` text NOT NULL,
  `slug` text NOT NULL,
  `specId` varchar(191) NOT NULL DEFAULT '',
  `updatedBy` text NOT NULL DEFAULT '',
  `isNewProduct` tinyint(1) NOT NULL DEFAULT 0,
  `featuredDesc` text NOT NULL DEFAULT '',
  `series` text NOT NULL DEFAULT '',
  `activeSubwooferSpecId` varchar(191) NOT NULL DEFAULT '',
  `thieleSmallParameter2OhmId` varchar(191) NOT NULL DEFAULT '',
  `thieleSmallParameter4OhmId` varchar(191) NOT NULL DEFAULT '',
  `tweeterSpecId` varchar(191) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `brandId`, `name`, `isFeatured`, `isArchived`, `sizeId`, `createdAt`, `updatedAt`, `description`, `slug`, `specId`, `updatedBy`, `isNewProduct`, `featuredDesc`, `series`, `activeSubwooferSpecId`, `thieleSmallParameter2OhmId`, `thieleSmallParameter4OhmId`, `tweeterSpecId`) VALUES
('164c19d2-170f-4b48-958e-68ec335392f0', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '5\" BST 522 MK3', 0, 0, '65830f7d-49e4-40e7-875c-02f2a72e1383', '2024-09-26 01:03:09.716', '2024-12-09 08:58:33.619', '-', 'bst-522-mk3', '164ef56e-9020-47a2-9140-93f5ad5e02b3', 'admin', 0, '', '', '', '0767a25e-725f-4f81-8bfd-47461301f8f9', '', ''),
('2b1193f0-37cb-4576-9bfc-028cd5694d0e', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '12\" LG 1299-2-Mk1', 0, 0, 'afce813f-8a7d-424c-a086-9031ed369f64', '2024-09-25 09:09:39.014', '2024-11-28 03:20:43.401', '-', 'lg-1299-2-mk1', '1c522496-ad9e-4b96-aacc-fd1cee506b5c', 'admin', 0, '', '', '', '2e1fa33c-e1e8-4d9f-956e-0bc5fbc7be90', '8dff9604-2e5f-43a7-9fe3-b44264024b08', ''),
('2e888496-0048-4943-982f-ebfdd4625e1f', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '10\" LG 1009-2', 0, 1, '7f514f65-c75e-482d-bf43-66c4f8c08edc', '2024-09-25 08:49:55.751', '2024-11-28 03:12:56.212', '-', 'lg-1009-2', 'f938ce0c-2b3c-4bbc-8b5b-e63f7745c288', 'admin', 0, '', '', '', 'a3c6198c-a0d1-4df0-89b6-1c800d72bafa', '8c1d21f7-b361-45f5-84f7-242a60ef7cfd', 'fe69ccc4-2f16-4cb4-8c93-6fbeeca4f1e1'),
('3213ef26-e2ab-4332-8d12-6ad1f18f39a2', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '4\" W 8347 B/H', 0, 0, '2fdca373-4286-4dfc-bfa7-de77b7e1fe0d', '2024-09-26 00:58:53.223', '2024-11-28 03:33:43.387', '-', 'w-8347-b', '2b895bec-bcb7-4d3e-add6-f748391f2edc', 'admin', 0, '', '', '', '3ea7a0d4-d423-447b-8e9e-70457c9cd3c3', '', ''),
('3d4dd01e-42bc-41b7-8015-9c5d8afc8f1e', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '12\" PG 1254-2 RED', 0, 0, 'afce813f-8a7d-424c-a086-9031ed369f64', '2024-09-26 00:55:29.500', '2024-11-28 03:32:11.116', '-', 'pg-1254-2-red', '36ed5158-df77-4685-985c-c98a74bd7b81', 'admin', 0, '', '', '', 'de3e1e64-8997-4fe0-b898-32ffd775dd38', '432665c1-2a2c-4878-9090-68b4f1bde23f', ''),
('41a41be4-0044-4958-b270-7afa8207446c', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '6X9\" BST 6981 MK1', 0, 0, 'ed8a91c0-2efb-4f49-892e-5f5cb123bd86', '2024-09-26 01:05:49.444', '2024-12-09 08:57:24.136', '-', 'bst-6981-mk1', 'e4ba71b3-5dbb-448f-a93d-868663dbda2f', 'admin', 0, '', '', '', '9dbf427c-0e0e-46f2-9a7f-86c49c0f5352', '', ''),
('42802840-d898-46ea-8377-7e0a9b6a060f', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '10\" PG 1054-2 RED', 0, 0, '7f514f65-c75e-482d-bf43-66c4f8c08edc', '2024-09-26 00:54:36.579', '2024-11-28 03:31:53.123', '-', 'pg-1054-2-red', '3a0e4813-0eb0-4eee-a062-5cf6e6c33882', 'admin', 0, '', '', '', '402a1d71-2ecd-4faa-a6f6-ac4065840c70', 'f5ffb87a-ad5c-4b34-aa6b-405e32890c50', ''),
('4899e144-b93b-446a-89b4-b055230545ee', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', ' 10\" LG 1098-2', 0, 0, '7f514f65-c75e-482d-bf43-66c4f8c08edc', '2024-09-25 09:00:46.243', '2024-11-28 03:12:45.617', '-', 'lg-1098-2', '6673a811-a096-4f57-b84b-4ddaa404e992', 'admin', 0, '', '', '', 'db2112f2-5182-4888-bc00-e1446e392fc0', '6d987899-0894-459c-8794-f08d40ccfffb', ''),
('498bc88a-d5e6-4314-ad72-499ea3f1f780', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '12\" LG 1298-2', 0, 0, 'afce813f-8a7d-424c-a086-9031ed369f64', '2024-09-25 09:08:41.334', '2024-11-28 03:20:26.636', '-', 'lg-1298-2', '63e06e12-55c2-43f4-9381-73eb81a9f641', 'admin', 0, '', '', '', 'e6c4b1d8-3455-4b20-a4cb-d54193afaa63', '735661d3-3e31-4d2b-9d4c-2faacf55138a', ''),
('55fd0ddf-cd00-45a1-8ee0-6fd4231bd69e', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '8\" LG 896-2', 0, 0, '3ceafaeb-f3e4-4034-b46a-44948d3c2062', '2024-09-25 09:14:08.427', '2024-11-28 03:22:53.632', '-', 'lg-896-2', 'd2913d7d-3632-4447-8dbf-5860c0d455c9', 'admin', 0, '', '', '', '3c001c53-df27-46f1-aa5b-75584a4a31a1', 'a20273ff-6248-4f58-b1a1-26a9aa86a7a6', ''),
('58e4147b-93a0-4809-955d-d04ce1161c5e', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '12\" LG 1277-2', 1, 0, 'afce813f-8a7d-424c-a086-9031ed369f64', '2024-09-25 09:04:43.154', '2025-01-03 03:42:09.130', '-', 'lg-1277-2', 'e822b9c0-c1d2-4119-adeb-6fdb19ba4f14', 'admin', 0, 'Tampilan fresh dan elegan serta jahitan antara conepaper dan surround yang kuat mampu meningkatkan performa bass yang kuat dan dalam', 'LEGACY', '', '69d8c28d-5bd5-41fa-9e34-22d19d2f1916', '6d3099c3-8102-4d9d-b184-099033a7e666', ''),
('5fa5a613-16a3-4b8f-92c6-dd2bd7b68f8b', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', ' 10\" LG 1077-2', 0, 0, '7f514f65-c75e-482d-bf43-66c4f8c08edc', '2024-09-25 08:53:37.562', '2024-11-28 03:10:43.849', '-', 'lg-1077-2', '69421bd1-1406-4768-9321-81a0521ab800', 'admin', 0, '', '', '', 'bc9187ea-506a-4186-9bef-c5b1a137bf8d', '514d985b-edd7-46f7-8d22-f9d63b8c6040', ''),
('62a47bd6-a0c2-4df9-9cd0-21c496076a5a', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', ' 10\" LG 1038-2', 0, 1, '7f514f65-c75e-482d-bf43-66c4f8c08edc', '2024-09-25 08:51:18.457', '2024-11-28 03:43:16.934', '-', 'lg-1038-2', 'af6e2faf-6204-4a72-b0e4-09b4696228bd', 'admin', 0, '', '', '', '88e64212-77a6-40ce-9dda-923b4fafeb0e', 'ae840cca-97f1-4c81-855b-a48fcd78e559', ''),
('69db9385-8c1f-4863-a07d-30e3fc952ec6', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '6\" LG 638-2 MK1', 0, 0, 'ed8a91c0-2efb-4f49-892e-5f5cb123bd86', '2024-09-25 09:11:28.844', '2024-11-28 03:23:18.524', '-', 'lg-638-2-mk1', '92af05e7-e906-4282-9509-51bcbfe5cf76', 'admin', 0, '', '', '', 'ccd3d603-9f32-4f0a-8b6a-45b23cc54ba0', '379063e4-69f1-42a1-948d-116ebcfd68ec', ''),
('6f3b950d-f94f-4c21-8e42-7e05251434b4', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '12\" LG 1295-2 MK1', 0, 0, 'afce813f-8a7d-424c-a086-9031ed369f64', '2024-09-25 09:06:50.888', '2024-11-28 03:19:37.764', '-', 'lg-1295-2-mk1', '9760fcb1-7c05-454a-af25-af1811a5ea44', 'admin', 0, '', '', '', 'eaef6ba7-909e-43f8-a776-09325a564ea1', 'a7f81967-64c4-457a-b4fa-013a751bada0', ''),
('745f44c7-888c-4919-832c-99fb176ff0fa', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'LG 138', 0, 0, '1e7d5fe4-3644-4d31-9ef4-4755288b49bc', '2024-11-12 07:06:35.748', '2024-11-28 03:31:33.784', '-', 'lg-138', '774fc0bf-97df-4366-b28c-0b4a2905df05', 'admin', 0, '', '', '', '', '', ''),
('77932324-df07-44d8-84d2-30af8ae38c0a', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', ' 12\" LG 1238-2', 0, 0, 'afce813f-8a7d-424c-a086-9031ed369f64', '2024-09-25 09:01:36.911', '2025-01-03 00:18:29.286', '-', 'lg-1238-2', '6e604ff2-f3c1-457a-b8bb-55fe2e5a2a6d', 'admin', 0, '', '', '', '03d0ad93-d138-42af-b116-0b00c31b84bd', '4830e07c-61df-4558-b482-9d342c659825', ''),
('78c76b38-9464-446b-ad93-2a10560d25b8', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '10\" LG 10352', 0, 1, '7f514f65-c75e-482d-bf43-66c4f8c08edc', '2024-10-04 04:17:33.247', '2024-11-28 03:13:07.614', '-', 'lg-10352', 'dc0d32bc-49f7-4c8f-bac1-0b9d28b50ff9', 'admin', 0, '', 'SPARTA', 'd073bccc-78d6-4217-91f9-0d9a38d40fbf', '', '', ''),
('7a0b71f7-4400-4318-af0e-fc23c27171d1', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '4\" BST 422 MK3', 0, 0, '2fdca373-4286-4dfc-bfa7-de77b7e1fe0d', '2024-09-26 01:00:51.906', '2024-12-09 08:58:52.946', '-', 'bst-422-mk3', 'be8b2a86-80c0-44b4-a7a4-db4298e512b0', 'admin', 0, 'Placeholder for 4\" BST 422 MK3', '', '', 'fdd7fc8c-09d4-4953-b6bd-162a70c4674e', '', ''),
('8c29e60a-34c0-4b99-b9bf-104be2655e65', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '10\" LG 1096-2-MK1', 0, 0, '7f514f65-c75e-482d-bf43-66c4f8c08edc', '2024-09-25 08:59:46.656', '2024-12-09 09:00:42.274', '-', 'lg-1096-2-mk1', 'b964b0d5-decb-43d4-bb09-4bb96666b88c', 'admin', 0, '', '', '', '8feea0b4-3c65-4403-894d-7fc348dc0b2b', 'ce45fbc0-4186-461b-9e66-4fa23fb6a6cc', ''),
('95bba079-4da5-4ac3-8a9a-9fdf23f146b7', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '6\" LG 696-2', 0, 0, 'ed8a91c0-2efb-4f49-892e-5f5cb123bd86', '2024-09-25 09:12:22.543', '2024-11-28 03:22:07.568', '-', 'lg-696-2', '6acd9407-06e3-49e1-9e26-931206db267b', 'admin', 0, '', '', '', '61bad8b3-5512-4223-a778-2ea4e5baed26', '38cd38ef-218e-457a-861f-69e94ba10a98', ''),
('963116bc-4fef-48ae-a8e6-f655be756dc7', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '12\" LG 1296-2 MK1', 0, 0, 'afce813f-8a7d-424c-a086-9031ed369f64', '2024-09-25 09:07:38.605', '2024-12-09 09:00:16.567', '-', 'lg-1296-2-mk1', 'e170e131-9df8-4980-8a2e-14dbbbbb4a29', 'admin', 0, '', '', '', '3fcde352-0a5f-450e-b9b9-652555c1ecf0', '49d1094d-fb9f-48bb-adbf-3cc13ed062ee', ''),
('96f6309b-96d1-466f-9dbb-bff04e8e1fac', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '4\" BST 1023 Dual', 0, 0, '2fdca373-4286-4dfc-bfa7-de77b7e1fe0d', '2024-09-26 01:07:45.601', '2024-12-09 08:56:57.085', '-', 'bst-1023-dual', 'c8f8001c-39c0-4bbe-baa2-3382c72d1704', 'admin', 0, '', '', '', '832f216d-971b-43d5-a7c0-b9e3486786e3', '', ''),
('970f6aa5-91f5-464c-96e4-83f86280d053', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '6.5\" LG-6521', 0, 0, '8dbb7e6d-2d6b-4e32-acc6-852e91b501e2', '2024-09-26 00:47:56.066', '2024-12-09 08:59:53.433', '-', 'lg-6521', 'b6a59182-9aad-4154-bed1-ad3de6d6baf3', 'admin', 0, '', '', '', 'b385b231-162b-4cba-9531-82217627ea0e', '', '08bb45bd-3f1e-473f-9223-ebd73b53cb2e'),
('ad3d4329-2433-42aa-8b0e-542a474f1c91', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '6.5\" BST 615 MK3', 0, 0, '8dbb7e6d-2d6b-4e32-acc6-852e91b501e2', '2024-09-26 01:04:41.343', '2024-12-09 08:57:50.362', '-', 'bst-615-mk3', '72f590eb-b488-4015-b5a0-2f6f384aca72', 'admin', 0, '', '', '', 'aeb8bdd7-b48c-4b84-aa00-870bc1a85174', '', ''),
('b4e5347e-fd18-4b47-a74a-6d90c6e0c305', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '8\" PG 854-2 RED', 1, 0, '3ceafaeb-f3e4-4034-b46a-44948d3c2062', '2024-09-25 06:41:10.126', '2025-01-03 03:42:21.840', '-', 'pg-854-2-red', '301761ee-fb3e-4cff-8266-9de18b81e0ff', 'admin', 0, 'Tipe speaker yang mampu meningkatkan pengalaman konser di mobilmu yang didapat dari material berkualitas tinggi ', 'PRESTIGE', '', '36e42186-e5df-419d-b38a-4ccfe32da3c3', 'c48f0155-c45b-4f11-9aa8-ed5ed91bc8fc', ''),
('b912e31b-58aa-4b51-a7d2-f1b80ebdfc0d', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '12\" LG 1292-2', 0, 0, 'afce813f-8a7d-424c-a086-9031ed369f64', '2024-09-25 09:05:55.008', '2024-11-28 03:19:22.600', '-', 'lg-1292-2', 'd3ad7e64-815c-4425-812f-cbd34708c5e3', 'admin', 0, '', '', '', '60282f17-3e2a-41a4-8cdb-6b604ae79ba8', '4500357b-52a4-450c-90da-de3347d69370', ''),
('b9658a8b-77d9-4e00-8e0a-99b52fb1fad4', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '6.5\" BST 1614', 0, 0, '8dbb7e6d-2d6b-4e32-acc6-852e91b501e2', '2024-09-26 01:03:53.260', '2024-12-09 08:58:14.299', '-', 'bst-1614', 'e6561a41-9449-423b-bf99-bf6e3b3dfb29', 'admin', 0, '', '', '', '9909a652-14b0-4699-8ba7-422706fe854e', '', ''),
('bd5ecf65-04d8-4b4d-813b-cffd8748b0fa', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '8\" LG 838-2 MK1', 1, 0, '3ceafaeb-f3e4-4034-b46a-44948d3c2062', '2024-09-25 09:13:21.931', '2025-02-07 06:12:02.774', '-', 'lg-838-2-mk1', '5fc6518f-8e6c-49ec-a07b-d0f10ad8f9df', 'admin', 0, 'Ciri khas warna orange yang dilengkapi dengan magnet rubber cover dan conepaper menggunakan teknik jahitan yang memaksimalkan durability speaker', 'ENERGY', '', '8879270d-5a27-43a5-b680-33545297d946', 'ea5b1198-c376-494d-89fc-a05f09bf2d8a', ''),
('bfef1a40-3cc6-4bc0-85dc-12501e9c8b8a', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '4\" W 8347 K/H', 0, 0, '2fdca373-4286-4dfc-bfa7-de77b7e1fe0d', '2024-09-26 00:59:38.539', '2024-11-28 03:34:00.591', '-', 'w-8347-k', '070d13c6-7c06-4045-8d3b-b71e695a0120', 'admin', 0, '', '', '', '70996f48-8903-4254-ba69-a307332eb77f', '', ''),
('c0118d2b-ca07-4d5d-9819-42b1fdc27655', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'PG 298', 0, 0, '28c45742-6d1f-44bd-915b-f940e30caf92', '2024-09-26 01:06:47.849', '2024-11-28 03:42:36.369', '-', 'pg-298', '74942f28-2888-4ea7-a433-d8658aa79e94', 'admin', 0, '', '', '', 'e72fcf5a-6865-49d9-80b4-ed0c0d4bbc14', '', ''),
('c2abeea1-3c8d-4900-af2a-6fcb27bcb738', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '12\" LG 12386-2', 0, 0, 'afce813f-8a7d-424c-a086-9031ed369f64', '2024-09-25 09:03:39.694', '2024-11-28 03:25:39.979', '-', 'lg-12386-2', 'f0df23ba-0d5d-4958-9e65-474b4f590170', 'admin', 0, '', '', '', '53d00cf1-c109-4868-acb1-b534a66ea2ea', '5d7610fe-a116-477b-aabd-0c96968d9df4', ''),
('c52ce46f-89a5-4576-a4fd-8a7ae5cf1f53', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '15\" LG 1596-2', 0, 0, 'bde0763b-2624-4b11-9f5c-993cd19f68ce', '2024-09-25 09:10:34.176', '2024-11-28 03:20:58.019', '-', 'lg-1596-2', 'dac2b02b-f18d-4753-b1b6-ced5518a1b65', 'admin', 0, '', '', '', 'b7ee5964-63aa-4558-be18-1336d630371d', 'f78d1757-d2dd-4a5c-9392-b2567dbf6f6c', ''),
('cc2d7eb7-526f-4ffe-923d-4b6c57fb9006', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '10\" LG 10385-2', 0, 0, '7f514f65-c75e-482d-bf43-66c4f8c08edc', '2024-09-25 08:52:29.672', '2024-12-17 05:55:19.886', '-', 'lg-10385-2', 'bd2ee54a-3648-476f-ab14-2c482566d455', 'admin', 0, '', 'SPARTA', '', '216fc431-9733-41af-aecd-9c23914c6e2a', '4ab077c1-a342-4039-a78f-793419c4a9dc', ''),
('e3770df5-ea15-4be2-85f5-703caecdfd36', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', ' 10\" LG 1095-2-MK1', 0, 0, '7f514f65-c75e-482d-bf43-66c4f8c08edc', '2024-09-25 08:55:57.931', '2024-12-13 01:59:24.723', '-', 'lg-1095-2-mk1', 'a91d932e-2cdf-4390-bdeb-d7e76a06417f', 'admin', 0, '', '', '', 'e395541c-4a39-4532-9b06-0ecc48909a66', '18a9f740-bec9-45eb-b316-dcf8e352f929', ''),
('e8b1b732-196b-4f84-9f7a-a4b24f28c521', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '10\" LG 1040 & 12\" LG 1240', 1, 0, 'afce813f-8a7d-424c-a086-9031ed369f64', '2025-04-24 02:57:33.238', '2025-04-28 01:31:19.893', '-', 'lg-1040-12', '9b3e105b-b742-4692-913b-c277e4f12f58', 'admin', 0, 'Limited Edition', 'LEGACY', '', '', '', ''),
('fdd744f3-a65e-4c33-b2b6-81306f7b47f8', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', ' 12\" LG 12385-2', 1, 0, 'afce813f-8a7d-424c-a086-9031ed369f64', '2024-09-25 06:18:42.613', '2025-01-03 03:42:30.576', '-', 'lg-12385-2', 'b2cee453-c2d5-4682-a971-cdde85e4f1be', 'admin', 0, 'Kesan elegan dan garang dari warna hitam dan kuning, serta memiliki karakter suara yang lebih akustik', 'SPARTA', '', '13bfbb5a-783b-458a-93f1-b5a2d60073de', '84048a4e-d6a5-4228-a34f-6f73e93b00f6', '');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `brandId` varchar(191) NOT NULL,
  `brandName` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `userId`, `brandId`, `brandName`) VALUES
('', '25cd8d0d-d185-41e8-9943-fdf1264236f2', 'admin', ''),
('66ea9a8e-23f2-4c5a-92ce-11c51c5c7da0', '52309261-f2b5-4c3a-bb4d-b61e90fc53ae', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'Legacy');

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `id` varchar(191) NOT NULL,
  `brandId` varchar(191) NOT NULL,
  `name` text NOT NULL,
  `value` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `updatedBy` varchar(191) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`id`, `brandId`, `name`, `value`, `createdAt`, `updatedAt`, `updatedBy`) VALUES
('1e7d5fe4-3644-4d31-9ef4-4755288b49bc', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '1', '1\"', '2024-11-12 07:06:50.758', '2024-11-12 07:06:50.758', 'admin'),
('28c45742-6d1f-44bd-915b-f940e30caf92', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', 'None', '-', '2024-05-08 01:45:00.573', '2024-05-08 01:45:00.573', 'admin'),
('2fdca373-4286-4dfc-bfa7-de77b7e1fe0d', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '4', '4\"', '2024-09-24 08:51:16.284', '2024-09-24 08:51:16.284', 'admin'),
('3ceafaeb-f3e4-4034-b46a-44948d3c2062', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '8', '8\"', '2024-04-17 07:13:57.372', '2024-04-17 07:13:57.372', 'admin'),
('65830f7d-49e4-40e7-875c-02f2a72e1383', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '5', '5\"', '2024-09-24 08:51:34.454', '2024-09-24 08:51:34.454', 'admin'),
('7f514f65-c75e-482d-bf43-66c4f8c08edc', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '10', '10\"', '2024-03-28 08:42:46.670', '2024-03-28 08:42:46.670', 'admin'),
('8dbb7e6d-2d6b-4e32-acc6-852e91b501e2', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '6.5', '6.5\"', '2024-04-17 07:13:39.043', '2024-04-17 07:13:39.043', 'admin'),
('afce813f-8a7d-424c-a086-9031ed369f64', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '12', '12\"', '2024-04-17 07:12:50.306', '2024-04-17 07:12:50.306', 'admin'),
('bde0763b-2624-4b11-9f5c-993cd19f68ce', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '15', '15\"', '2024-04-17 07:12:56.926', '2024-04-17 07:12:56.926', 'admin'),
('ed8a91c0-2efb-4f49-892e-5f5cb123bd86', '680c5eee-7ed7-41bc-b14b-4185f8a1c379', '6', '6\"', '2024-03-28 08:43:56.257', '2024-03-28 08:43:56.257', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `specification`
--

CREATE TABLE `specification` (
  `id` varchar(191) NOT NULL,
  `voice_coil_diameter` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `custom_note` text NOT NULL DEFAULT '',
  `berat_magnet` varchar(191) NOT NULL,
  `berat_speaker` varchar(191) NOT NULL,
  `daya_maksimum` varchar(191) NOT NULL,
  `diameter_speaker` varchar(191) NOT NULL,
  `impedansi` varchar(191) NOT NULL,
  `lebar_daerah_frekuensi` varchar(191) NOT NULL,
  `medan_magnet` varchar(191) NOT NULL,
  `nominal_power_handling` varchar(191) NOT NULL,
  `program_power` varchar(191) NOT NULL,
  `spl` varchar(191) NOT NULL,
  `voice_coil_material` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `specification`
--

INSERT INTO `specification` (`id`, `voice_coil_diameter`, `createdAt`, `updatedAt`, `productId`, `custom_note`, `berat_magnet`, `berat_speaker`, `daya_maksimum`, `diameter_speaker`, `impedansi`, `lebar_daerah_frekuensi`, `medan_magnet`, `nominal_power_handling`, `program_power`, `spl`, `voice_coil_material`) VALUES
('0', '', '0000-00-00 00:00:00.000', '0000-00-00 00:00:00.000', '', '', '', '', '', '', '', '', '', '', '', '', ''),
('070d13c6-7c06-4045-8d3b-b71e695a0120', '', '2024-09-27 04:00:25.108', '2024-09-27 04:00:25.108', 'bfef1a40-3cc6-4bc0-85dc-12501e9c8b8a', '', '', '', '', '', '', '', '', '', '', '', ''),
('164ef56e-9020-47a2-9140-93f5ad5e02b3', '20.4', '2024-09-27 04:04:29.959', '2024-11-04 05:56:37.258', '164c19d2-170f-4b48-958e-68ec335392f0', '- (¹) AES standard, test mode with continuous pink noise signal (6 dB crest factor; 2 hours) within the Fo to 10Fo power calculated on rated nominal impedance. Loudspeaker in free air - (²) Power on continous program is defined as 3dB greater than nominal power handling.', '0.14 kg / 5.1 Oz', '', '', '5.25 inch / 133.3 mm', '4', '129 Hz - 9900 Hz', '1.03', '20', '40', '91.5', 'KRAFT SV'),
('1a958670-5760-46cd-a0ab-5e5adaff7bf1', '35.5 mm', '2024-09-26 05:49:23.354', '2024-10-03 04:00:05.289', '4f583bcb-ae46-4e3c-9c77-5525d0f58c1f', '', '0.48kg / 16.9 Oz', '', '', '8 inch / 203.2 mm', '4 Ω', '49 Hz - 4600 Hz', '0.57 T', '100 Watt', '200 Watt', '85 dB', 'ASV'),
('1c522496-ad9e-4b96-aacc-fd1cee506b5c', '49.5', '2024-09-27 00:37:04.887', '2024-11-04 05:54:01.198', '2b1193f0-37cb-4576-9bfc-028cd5694d0e', '- (¹) Test mode with RS426 B Program Noise - (²) Power on continous program is defined as 3dB greater than nominal power handling.', '1.35 kg / 47.32 Oz', '', '', '12 inch / 305 mm', '4', '32 Hz - 3200 Hz', '0.87', '200', '400', '91', 'ASV'),
('2b895bec-bcb7-4d3e-add6-f748391f2edc', '', '2024-09-27 04:00:09.968', '2024-09-27 04:00:09.968', '3213ef26-e2ab-4332-8d12-6ad1f18f39a2', '', '', '', '', '', '', '', '', '', '', '', ''),
('301761ee-fb3e-4cff-8266-9de18b81e0ff', '35.52', '2024-09-27 03:58:18.546', '2024-11-04 05:53:20.954', 'b4e5347e-fd18-4b47-a74a-6d90c6e0c305', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '0.54 kg / 18.95 Oz', '', '100 Watt*', '8 inch / 203.2 mm', '', '46 Hz - 4.9 KHz', '0.74', '', '', '87', ''),
('36ed5158-df77-4685-985c-c98a74bd7b81', '49.5', '2024-09-27 03:55:51.789', '2024-11-04 05:57:43.159', '3d4dd01e-42bc-41b7-8015-9c5d8afc8f1e', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '0.81 kg / 28.49 Oz', '', '300 Watt*', '12 inch / 305 mm', '', '28 Hz - 2.9 KHz', '0.74', '', '', '93', ''),
('3a0e4813-0eb0-4eee-a062-5cf6e6c33882', '49.5', '2024-09-27 03:53:09.269', '2024-11-04 05:58:05.678', '42802840-d898-46ea-8377-7e0a9b6a060f', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '0.81 kg / 28.49 Oz', '', '250 Watt*', '10 inch / 254 mm', '', '28 Hz - 3.7 KHz', '0.74', '', '', '91', ''),
('5fc6518f-8e6c-49ec-a07b-d0f10ad8f9df', '35.5', '2024-09-27 00:48:21.155', '2024-11-04 05:47:50.373', 'bd5ecf65-04d8-4b4d-813b-cffd8748b0fa', '- (¹) AES standard, test mode with continuous pink noise signal (6 dB crest factor; 2 hours) within the Fo to 10Fo power calculated on rated nominal impedance. Loudspeaker in free air - (²) Power on continous program is defined as 3dB greater than nominal power handling.', '0.48 kg / 16.9 Oz', '', '', '8 inch / 203.2 mm', '4', '49 Hz - 4600 Hz', '0.57', '100', '200', '85', 'ASV'),
('63e06e12-55c2-43f4-9381-73eb81a9f641', '49.5', '2024-09-27 00:34:09.451', '2024-11-04 05:49:29.649', '498bc88a-d5e6-4314-ad72-499ea3f1f780', '- (¹) AES standard, test mode with continuous pink noise signal (6 dB crest factor; 2 hours) within the Fo to 10Fo power calculated on rated nominal impedance. Loudspeaker in free air - (²) Power on continous program is defined as 3dB greater than nominal power handling.', '1.35 kg / 47.3 Oz', '', '', '12 inch / 305 mm', '4', '32 Hz - 3400 Hz', '0.85', '200', '400', '92', 'ASV'),
('6673a811-a096-4f57-b84b-4ddaa404e992', '49.5', '2024-09-26 08:51:41.923', '2024-11-04 05:50:17.029', '4899e144-b93b-446a-89b4-b055230545ee', '(¹) AES standard, test mode with continuous pink noise signal (6 dB crest factor; 2 hours) within the Fo to 10Fo power calculated on rated nominal impedance. Loudspeaker in free air - (²) Power on continous program is defined as 3dB greater than nominal power handling.', '0.81 kg / 28.5 Oz', '', '', '10 inch / 254 mm', '4', '32 Hz - 4200 Hz', '0.85', '150', '300', '89', 'ASV'),
('69421bd1-1406-4768-9321-81a0521ab800', '49.5', '2024-09-26 08:36:47.247', '2024-11-04 05:50:09.742', '5fa5a613-16a3-4b8f-92c6-dd2bd7b68f8b', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '1.04 kg / 36.4 Oz', '', '250 Watt*', '10 inch / 254 mm', '4', '30 Hz - 5000 Hz', '0.76', '', '', '86', 'ASV'),
('6acd9407-06e3-49e1-9e26-931206db267b', '35.5', '2024-09-27 00:45:44.157', '2024-11-04 05:51:04.184', '95bba079-4da5-4ac3-8a9a-9fdf23f146b7', '- (¹) AES standard, test mode with continuous pink noise signal (6 dB crest factor; 2 hours) within the Fo to 10Fo power calculated on rated nominal impedance. Loudspeaker in free air - (²) Power on continous program is defined as 3dB greater than nominal power handling.', '0.36 kg / 12.7 Oz', '', '', '6 inch / 152.4 mm', '4', '47 Hz - 1780 Hz', '0.7', '50', '100', '87', 'ASV'),
('6e604ff2-f3c1-457a-b8bb-55fe2e5a2a6d', '38.56', '2024-09-26 08:55:17.557', '2025-01-03 00:18:29.276', '77932324-df07-44d8-84d2-30af8ae38c0a', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '0.81 kg / 28.35 Oz', '', '350 Watt*', '12 inch / 305 mm', '4', '35 Hz - 2500 Hz', '0.87', '', '', '95', 'ASV'),
('72f590eb-b488-4015-b5a0-2f6f384aca72', '25.4', '2024-09-27 04:08:20.625', '2024-11-04 05:55:50.082', 'ad3d4329-2433-42aa-8b0e-542a474f1c91', '- (¹) AES standard, test mode with continuous pink noise signal (6 dB crest factor; 2 hours) within the Fo to 10Fo power calculated on rated nominal impedance. Loudspeaker in free air - (²) Power on continous program is defined as 3dB greater than nominal power handling.', '0.14 kg / 5.1 Oz', '', '', '6.5 inch /165 mm', '4', '105 Hz - 20.000 Hz', '1.03', '25', '50', '90', 'ASV'),
('74942f28-2888-4ea7-a433-d8658aa79e94', '17.8', '2024-09-27 04:13:32.679', '2024-11-04 05:54:57.902', 'c0118d2b-ca07-4d5d-9819-42b1fdc27655', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '0.21', '', '50 Watt*', '1.6 inch', '4', '2 Hz - 20 KHz', '', '', '', '88', ''),
('774fc0bf-97df-4366-b28c-0b4a2905df05', '', '2024-11-12 07:06:35.775', '2024-11-12 07:09:07.467', '745f44c7-888c-4919-832c-99fb176ff0fa', '', '', '', '50 Watt', '', '4', '2.9 KHz - 20 KHz', '', '', '', '91', 'Mylar'),
('90361de3-1418-440c-89b0-ba50540e1896', '', '2024-10-04 04:04:42.016', '2024-10-04 04:04:42.016', '84d0978c-8907-458b-a8a8-99d45b40535b', '', '', '', '', '', '', '', '', '', '', '', ''),
('92af05e7-e906-4282-9509-51bcbfe5cf76', '25.4', '2024-09-27 00:43:22.228', '2024-11-04 05:48:51.527', '69db9385-8c1f-4863-a07d-30e3fc952ec6', '- (¹) AES standard, test mode with continuous pink noise signal (6 dB crest factor; 2 hours) within the Fo to 10Fo power calculated on rated nominal impedance. Loudspeaker in free air - (²) Power on continous program is defined as 3dB greater than nominal power handling.', '0.36 kg / 12.7 Oz', '', '', '6 inch / 152.4 mm', '4', '49 Hz - 2900 Hz', '0.72', '50', '100', '84', 'ASV'),
('9760fcb1-7c05-454a-af25-af1811a5ea44', '49.5', '2024-09-27 00:28:06.895', '2024-11-04 05:50:02.218', '6f3b950d-f94f-4c21-8e42-7e05251434b4', '- (¹) AES standard, test mode with continuous pink noise signal (6 dB crest factor; 2 hours) within the Fo to 10Fo power calculated on rated nominal impedance. Loudspeaker in free air - (²) Power on continous program is defined as 3dB greater than nominal power handling.', '1.16 kg / 40.6 Oz', '', '', '12 inch / 305 mm', '4', '35 Hz - 3000 Hz', '0.84', '200', '400', '92', 'ASV'),
('9b3e105b-b742-4692-913b-c277e4f12f58', '', '2025-04-24 02:57:33.271', '2025-04-28 01:31:03.331', 'e8b1b732-196b-4f84-9f7a-a4b24f28c521', '', '', '', '', '', '', '', '', '', '', '', ''),
('a91d932e-2cdf-4390-bdeb-d7e76a06417f', '49.5', '2024-09-26 08:44:10.807', '2024-11-04 05:50:37.276', 'e3770df5-ea15-4be2-85f5-703caecdfd36', '- (¹) AES standard, test mode with continuous pink noise signal (6 dB crest factor; 2 hours) within the Fo to 10Fo power calculated on rated nominal impedance. Loudspeaker in free air - (²) Power on continous program is defined as 3dB greater than nominal power handling.', '0.81 kg / 28.5 Oz', '', '', '10 inch / 254 mm', '4', '38 Hz - 3600 Hz', '0.74', '150', '300', '86.5', 'ASV'),
('af6e2faf-6204-4a72-b0e4-09b4696228bd', '38.56', '2024-09-26 06:06:42.379', '2024-11-04 05:48:43.329', '62a47bd6-a0c2-4df9-9cd0-21c496076a5a', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '0.81 kg / 28.35 Oz', '', '300 Watt*', '10 inch / 254 mm', '4', '34 Hz - 2500 Hz', '0.87', '', '', '91', 'ASV'),
('b2cee453-c2d5-4682-a971-cdde85e4f1be', '38.56', '2024-09-26 09:04:56.382', '2024-11-04 05:48:27.400', 'fdd744f3-a65e-4c33-b2b6-81306f7b47f8', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '1.04 kg / 36.4 Oz', '', '350 Watt*', '12 inch / 305 mm', '4', '32 Hz - 5000 Hz', '0.8', '', '', '91', 'ASV'),
('b6a59182-9aad-4154-bed1-ad3de6d6baf3', '25.4', '2024-09-27 02:22:01.944', '2024-11-04 05:51:16.084', '970f6aa5-91f5-464c-96e4-83f86280d053', '- (¹) AES standard, test mode with continuous pink noise signal (6 dB crest factor; 2 hours) within the Fo to 10Fo power calculated on rated nominal impedance. Loudspeaker in free air - (²) Power on continous program is defined as 3dB greater than nominal power handling.', '0.217 kg / 7.6 Oz', '0.493', '', '6.5 inch / 165 mm', '4', '77 Hz - 6700 Hz', '0.95', '40', '80', '88', 'Kapton'),
('b964b0d5-decb-43d4-bb09-4bb96666b88c', '49.5', '2024-09-26 08:46:44.032', '2024-11-04 05:50:26.491', '8c29e60a-34c0-4b99-b9bf-104be2655e65', '- (¹) AES standard, test mode with continuous pink noise signal (6 dB crest factor; 2 hours) within the Fo to 10Fo power calculated on rated nominal impedance. Loudspeaker in free air - (²) Power on continous program is defined as 3dB greater than nominal power handling.', '1.16 kg / 40.6 Oz', '', '', '10 inch / 254 mm', '4', '38 Hz - 3750 Hz', '0.8', '150', '300', '88', 'ASV'),
('bd2ee54a-3648-476f-ab14-2c482566d455', '38.56', '2024-09-26 08:41:17.893', '2024-11-04 05:48:20.427', 'cc2d7eb7-526f-4ffe-923d-4b6c57fb9006', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '1.04 kg / 36.4 Oz', '', '300 Watt*', '10 inch / 254 mm', '4', '35 Hz - 5000 Hz', '0.8', '', '', '89', 'ASV'),
('be8b2a86-80c0-44b4-a7a4-db4298e512b0', '20.4', '2024-09-27 04:01:44.407', '2024-11-04 05:57:07.438', '7a0b71f7-4400-4318-af0e-fc23c27171d1', '- (¹) AES standard, test mode with continuous pink noise signal (6 dB crest factor; 2 hours) within the Fo to 10Fo power calculated on rated nominal impedance. Loudspeaker in free air - (²) Power on continous program is defined as 3dB greater than nominal power handling.', '0.14 kg / 5.1 Oz', '', '', '4 inch / 101 mm', '4', '146 Hz - 16500 Hz', '1.03', '20', '40', '90.5', 'KRAFT SV'),
('c8f8001c-39c0-4bbe-baa2-3382c72d1704', '20.42', '2024-09-27 04:14:36.660', '2024-11-04 05:54:40.595', '96f6309b-96d1-466f-9dbb-bff04e8e1fac', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '0.14 kg / 5.11 Oz', '', '50 Watt*', '4 inch / 101.5 mm', '', '125 Hz - 13 KHz', '1.03', '', '', '88.4', ''),
('d2913d7d-3632-4447-8dbf-5860c0d455c9', '49.5', '2024-09-27 00:50:38.494', '2024-11-04 05:50:55.379', '55fd0ddf-cd00-45a1-8ee0-6fd4231bd69e', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '0.81 kg / 28.5 Oz', '', '200', '8 inch / 203.2 mm', '4', '31 Hz - 2600 Hz', '0.75', '100', '200', '85', 'ASV'),
('d3ad7e64-815c-4425-812f-cbd34708c5e3', '49.5', '2024-09-26 09:15:00.794', '2024-11-04 05:49:14.886', 'b912e31b-58aa-4b51-a7d2-f1b80ebdfc0d', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '1.31 kg / 45.96 Oz', '', '250 Watt*', '12 inch / 305 mm', '4', '37 Hz - 3800 Hz', '0.89', '', '', '93', 'ASV'),
('dac2b02b-f18d-4753-b1b6-ced5518a1b65', '49.5', '2024-09-27 00:39:55.460', '2024-11-04 05:48:59.318', 'c52ce46f-89a5-4576-a4fd-8a7ae5cf1f53', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '0.15 kg / 52.5 Oz', '', '500 Watt*', '15 inch / 381 mm', '4', '28 Hz - 3000 Hz', '0.95', '', '', '92', 'ASV'),
('dc0d32bc-49f7-4c8f-bac1-0b9d28b50ff9', '', '2024-10-04 04:17:33.256', '2024-10-04 04:20:43.312', '78c76b38-9464-446b-ad93-2a10560d25b8', '', '', '', '', '', '', '', '', '', '', '', ''),
('e170e131-9df8-4980-8a2e-14dbbbbb4a29', '49.5', '2024-09-27 00:31:20.829', '2024-11-04 05:49:52.970', '963116bc-4fef-48ae-a8e6-f655be756dc7', '- (¹) AES standard, test mode with continuous pink noise signal (6 dB crest factor; 2 hours) within the Fo to 10Fo power calculated on rated nominal impedance. Loudspeaker in free air - (²) Power on continous program is defined as 3dB greater than nominal power handling.', '1.35 kg / 47.3 Oz', '', '', '12 inch / 305 mm', '4', '36 Hz - 3000 Hz', '0.84', '200', '400', '92.5', 'ASV'),
('e4ba71b3-5dbb-448f-a93d-868663dbda2f', '25.4', '2024-09-27 04:10:31.993', '2024-11-04 05:55:17.442', '41a41be4-0044-4958-b270-7afa8207446c', '- (¹) AES standard, test mode with continuous pink noise signal (6 dB crest factor; 2 hours) within the Fo to 10Fo power calculated on rated nominal impedance. Loudspeaker in free air - (²) Power on continous program is defined as 3dB greater than nominal power handling.', '0.27 kg / 9.5 Oz', '', '', '6x9 inch / 152.4x228.6 mm', '4', '55 Hz - 20000 Hz', '1.05', '25', '50', '91.5', 'ASV'),
('e6561a41-9449-423b-bf99-bf6e3b3dfb29', '20.42', '2024-09-27 04:06:18.250', '2024-11-04 05:56:12.780', 'b9658a8b-77d9-4e00-8e0a-99b52fb1fad4', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '0.14 kg / 5.11 Oz', '', '100 Watt*', '6½ inch / 165 mm', '', '73 Hz - 19 KHz', '0.93', '', '', '90', ''),
('e822b9c0-c1d2-4119-adeb-6fdb19ba4f14', '49.5', '2024-09-26 09:11:12.973', '2024-11-04 05:49:06.570', '58e4147b-93a0-4809-955d-d04ce1161c5e', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '1.16 kg / 40.62 Oz', '', '300 Watt*', '12 inch / 302 mm', '2', '37 Hz - 2900 Hz', '0.79', '', '', '91', 'ASV'),
('f0df23ba-0d5d-4958-9e65-474b4f590170', '38.56', '2024-09-26 09:08:15.793', '2024-11-04 05:48:10.002', 'c2abeea1-3c8d-4900-af2a-6fcb27bcb738', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '1.04 kg / 36.4 Oz', '', '200 Watt*', '12 inch / 305 mm', '2', '43 Hz - 2400 Hz', '0.9', '', '', '92', 'ASV'),
('f938ce0c-2b3c-4bbc-8b5b-e63f7745c288', '49.5', '2024-09-26 06:02:38.274', '2024-11-04 05:54:22.812', '2e888496-0048-4943-982f-ebfdd4625e1f', '* IEC 268-5, (in box system, cut.off 20-500 Hz)', '1.19 kg / 41.65 Oz', '', '', '10 inch / 254 mm', '4', '33 Hz - 3.6 kHz', '0.83', '300', '', '88', 'ASV');

-- --------------------------------------------------------

--
-- Table structure for table `thielesmallparameters2ohm`
--

CREATE TABLE `thielesmallparameters2ohm` (
  `id` varchar(191) NOT NULL,
  `fs` varchar(191) NOT NULL,
  `dcr` varchar(191) NOT NULL,
  `qts` varchar(191) NOT NULL,
  `qes` varchar(191) NOT NULL,
  `qms` varchar(191) NOT NULL,
  `mms` varchar(191) NOT NULL,
  `cms` varchar(191) NOT NULL,
  `bl_product` varchar(191) NOT NULL,
  `vas` varchar(191) NOT NULL,
  `no` varchar(191) NOT NULL,
  `sd` varchar(191) NOT NULL,
  `x_max` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `thielesmallparameters2ohm`
--

INSERT INTO `thielesmallparameters2ohm` (`id`, `fs`, `dcr`, `qts`, `qes`, `qms`, `mms`, `cms`, `bl_product`, `vas`, `no`, `sd`, `x_max`, `productId`, `createdAt`, `updatedAt`) VALUES
('03d0ad93-d138-42af-b116-0b00c31b84bd', '35', '1.5', '0.54', '0.61', '4.84', '81.5', '0.26', '6.6', '94.8', '0.63', '514.7', '7.05', '77932324-df07-44d8-84d2-30af8ae38c0a', '2024-09-26 09:03:31.990', '2024-10-03 03:57:47.432'),
('0767a25e-725f-4f81-8bfd-47461301f8f9', '117', '3.6', '1.13', '1.44', '5.33', '3.2', '0.58', '2.4', '4.6', '0.49', '75.4', '1.33', '164c19d2-170f-4b48-958e-68ec335392f0', '2024-09-27 04:05:27.352', '2024-10-03 03:59:23.296'),
('13bfbb5a-783b-458a-93f1-b5a2d60073de', '32', '1.5', '0.78', '0.91', '5.48', '75.2', '0.3', '5.1', '112.3', '0.44', '514.7', '8.04', 'fdd744f3-a65e-4c33-b2b6-81306f7b47f8', '2024-09-26 09:06:39.984', '2024-10-03 03:57:53.272'),
('216fc431-9733-41af-aecd-9c23914c6e2a', '36', '1.5', '0.65', '0.74', '5.52', '59.4', '0.33', '5.2', '54.9', '0.34', '346.4', '8.04', 'cc2d7eb7-526f-4ffe-923d-4b6c57fb9006', '2024-09-26 08:42:45.920', '2024-10-03 03:57:29.410'),
('2e1fa33c-e1e8-4d9f-956e-0bc5fbc7be90', '32', '1.7', '0.46', '0.5', '5.23', '111', '0.23', '8.7', '82.7', '0.51', '510.7', '7.4', '2b1193f0-37cb-4576-9bfc-028cd5694d0e', '2024-09-27 00:38:45.495', '2024-10-03 03:58:17.944'),
('36e42186-e5df-419d-b38a-4ccfe32da3c3', '46', '1.7', '0.52', '0.6', '3.9', '31.8', '0.36', '5.1', '19.7', '0.31', '193.6', '4.2', 'b4e5347e-fd18-4b47-a74a-6d90c6e0c305', '2024-09-27 03:59:49.072', '2024-10-03 03:59:06.473'),
('3c001c53-df27-46f1-aa5b-75584a4a31a1', '31', '1.7', '0.33', '0.36', '4.22', '44.4', '0.59', '6.4', '38.6', '0.31', '216.4', '4.2', '55fd0ddf-cd00-45a1-8ee0-6fd4231bd69e', '2024-09-27 00:52:27.403', '2024-10-03 03:58:36.045'),
('3ea7a0d4-d423-447b-8e9e-70457c9cd3c3', '', '', '', '', '', '', '', '', '', '', '', '', '3213ef26-e2ab-4332-8d12-6ad1f18f39a2', '2024-10-03 03:59:12.987', '2024-10-03 03:59:12.987'),
('3fcde352-0a5f-450e-b9b9-652555c1ecf0', '36', '1.5', '0.52', '0.57', '6.97', '102.2', '0.19', '7.9', '69.6', '0.57', '514.7', '8.03', '963116bc-4fef-48ae-a8e6-f655be756dc7', '2024-09-27 00:32:59.160', '2024-10-03 03:58:11.071'),
('402a1d71-2ecd-4faa-a6f6-ac4065840c70', '28', '1.6', '0.33', '0.36', '4.52', '61.5', '0.54', '6.9', '94.6', '0.53', '353', '5.7', '42802840-d898-46ea-8377-7e0a9b6a060f', '2024-09-27 03:54:52.991', '2024-10-03 03:58:58.260'),
('53d00cf1-c109-4868-acb1-b534a66ea2ea', '43', '1.5', '0.86', '1.15', '3.4', '81.4', '0.16', '5.4', '64.5', '0.45', '530.9', '8.04', 'c2abeea1-3c8d-4900-af2a-6fcb27bcb738', '2024-09-26 09:10:02.471', '2024-10-03 03:57:56.646'),
('60282f17-3e2a-41a4-8cdb-6b604ae79ba8', '37', '1.6', '0.45', '0.48', '6.55', '109.1', '0.19', '8.9', '69.7', '0.61', '514.7', '7.87', 'b912e31b-58aa-4b51-a7d2-f1b80ebdfc0d', '2024-09-26 09:16:45.686', '2024-10-03 03:58:03.798'),
('61bad8b3-5512-4223-a778-2ea4e5baed26', '47.4', '1.5', '0.49', '0.53', '5.94', '21.1', '0.54', '4.2', '13.6', '0.26', '134.8', '3.5', '95bba079-4da5-4ac3-8a9a-9fdf23f146b7', '2024-09-27 00:47:16.032', '2024-10-03 03:59:45.558'),
('69d8c28d-5bd5-41fa-9e34-22d19d2f1916', '37', '1.7', '0.67', '0.75', '6.18', '123.6', '0.14', '8.1', '54.2', '0.37', '518.7', '7.5', '58e4147b-93a0-4809-955d-d04ce1161c5e', '2024-09-26 09:13:30.506', '2024-10-03 03:58:00.536'),
('70996f48-8903-4254-ba69-a307332eb77f', '', '', '', '', '', '', '', '', '', '', '', '', 'bfef1a40-3cc6-4bc0-85dc-12501e9c8b8a', '2024-10-03 03:59:16.676', '2024-10-03 03:59:16.676'),
('832f216d-971b-43d5-a7c0-b9e3486786e3', '125', '3.6', '1.27', '1.76', '4.6', '2.3', '0.318', '2.37', '1.25', '0.43', '53', '1.5', '96f6309b-96d1-466f-9dbb-bff04e8e1fac', '2024-09-27 04:15:20.992', '2024-10-03 03:59:41.056'),
('8879270d-5a27-43a5-b680-33545297d946', '49', '1.5', '0.91', '1.02', '8.66', '40.5', '0.26', '4.3', '14.5', '0.17', '201.1', '7.1', 'bd5ecf65-04d8-4b4d-813b-cffd8748b0fa', '2024-09-27 00:49:50.799', '2024-10-03 03:58:31.724'),
('88e64212-77a6-40ce-9dda-923b4fafeb0e', '34', '1.5', '0.42', '0.46', '4.39', '62.2', '0.34', '6.6', '57.6', '0.49', '346.4', '7.05', '62a47bd6-a0c2-4df9-9cd0-21c496076a5a', '2024-09-26 06:10:25.520', '2024-10-03 03:57:20.114'),
('8feea0b4-3c65-4403-894d-7fc348dc0b2b', '38', '1.8', '0.53', '0.59', '5.58', '84.6', '0.21', '7.9', '36.5', '0.32', '353', '7.8', '8c29e60a-34c0-4b99-b9bf-104be2655e65', '2024-09-26 08:47:59.759', '2024-10-03 03:57:37.998'),
('9909a652-14b0-4699-8ba7-422706fe854e', '73', '3.6', '1.32', '1.78', '5.1', '6.9', '0.68', '2.5', '14.4', '0.31', '122.7', '1.54', 'b9658a8b-77d9-4e00-8e0a-99b52fb1fad4', '2024-09-27 04:07:13.870', '2024-10-03 03:59:27.020'),
('9dbf427c-0e0e-46f2-9a7f-86c49c0f5352', '55', '3.4', '0.97', '1.2', '4.97', '11.4', '0.72', '3.4', '42.5', '0.59', '206.1', '3.7', '41a41be4-0044-4958-b270-7afa8207446c', '2024-09-27 04:11:13.496', '2024-10-03 03:59:33.717'),
('a3c6198c-a0d1-4df0-89b6-1c800d72bafa', '33', '1.7', '0.36', '0.39', '5', '68.9', '300.7', '8.2', '51.12', '0.54', '346', '7.5', '2e888496-0048-4943-982f-ebfdd4625e1f', '2024-09-26 06:05:26.302', '2024-09-26 06:05:26.302'),
('aeb8bdd7-b48c-4b84-aa00-870bc1a85174', '105', '3.6', '1.17', '1.71', '3.7', '7.9', '0.34', '3.2', '6.9', '0.36', '120.8', '2.1', 'ad3d4329-2433-42aa-8b0e-542a474f1c91', '2024-09-27 04:09:16.337', '2024-10-03 03:59:30.947'),
('b385b231-162b-4cba-9531-82217627ea0e', '77', '3.4', '1.18', '1.47', '5.95', '12.5', '0.34', '3.8', '8.6', '0.26', '134.8', '3.4', '970f6aa5-91f5-464c-96e4-83f86280d053', '2024-09-27 02:23:15.234', '2024-10-03 03:58:54.876'),
('b7ee5964-63aa-4558-be18-1336d630371d', '27', '1.5', '0.42', '0.45', '5.36', '158.73', '0.22', '9.33', '199.53', '0.84', '805.6', '8.7', 'c52ce46f-89a5-4576-a4fd-8a7ae5cf1f53', '2024-09-27 00:42:17.008', '2024-09-27 00:42:17.008'),
('bc9187ea-506a-4186-9bef-c5b1a137bf8d', '30', '1.7', '0.45', '0.5', '4.96', '83.7', '0.3', '7.6', '52.7', '0.33', '356.3', '7.5', '5fa5a613-16a3-4b8f-92c6-dd2bd7b68f8b', '2024-09-26 08:40:08.293', '2024-10-03 03:57:25.126'),
('c053ab34-fdce-47ca-934a-ab0b25ed4c04', '49', '1.5', '0.91', '1.02', '8.66', '40.5', '0.26', '4.3', '14.5', '0.17', '201.1', '7.1', '4f583bcb-ae46-4e3c-9c77-5525d0f58c1f', '2024-09-26 05:53:17.149', '2024-10-03 03:55:21.837'),
('ccd3d603-9f32-4f0a-8b6a-45b23cc54ba0', '49', '1.5', '0.78', '0.88', '7.1', '23.4', '0.46', '3.5', '12.1', '0.15', '136.8', '6.5', '69db9385-8c1f-4863-a07d-30e3fc952ec6', '2024-09-27 00:44:45.145', '2024-10-03 03:58:27.177'),
('db2112f2-5182-4888-bc00-e1446e392fc0', '32', '1.7', '0.35', '0.38', '4.3', '67', '0.36', '7.8', '126.2', '1.08', '498.8', '7.4', '4899e144-b93b-446a-89b4-b055230545ee', '2024-09-26 08:54:03.535', '2024-10-03 03:57:41.567'),
('de3e1e64-8997-4fe0-b898-32ffd775dd38', '28', '1.7', '0.57', '0.63', '5.83', '89.5', '0.35', '6.6', '138.5', '0.49', '530.9', '5.7', '3d4dd01e-42bc-41b7-8015-9c5d8afc8f1e', '2024-09-27 03:57:25.021', '2024-10-03 03:59:02.168'),
('e395541c-4a39-4532-9b06-0ecc48909a66', '38', '1.8', '0.72', '0.81', '6.38', '85.5', '0.21', '6.7', '36.3', '0.23', '353', '7.8', 'e3770df5-ea15-4be2-85f5-703caecdfd36', '2024-09-26 08:45:25.543', '2024-10-03 03:57:32.701'),
('e6c4b1d8-3455-4b20-a4cb-d54193afaa63', '32', '1.7', '0.44', '0.49', '5', '83', '0.3', '7.6', '102.5', '0.66', '494.8', '7.4', '498bc88a-d5e6-4314-ad72-499ea3f1f780', '2024-09-27 00:35:47.269', '2024-10-03 03:58:14.782'),
('e72fcf5a-6865-49d9-80b4-ed0c0d4bbc14', '', '', '', '', '', '', '', '', '', '', '', '', 'c0118d2b-ca07-4d5d-9819-42b1fdc27655', '2024-10-03 03:59:37.158', '2024-10-03 03:59:37.158'),
('eaef6ba7-909e-43f8-a776-09325a564ea1', '35', '1.5', '0.57', '0.63', '6.78', '103', '0.19', '7.4', '71.8', '0.5', '514.7', '7.8', '6f3b950d-f94f-4c21-8e42-7e05251434b4', '2024-09-27 00:29:48.289', '2024-10-03 03:58:07.178'),
('fca53db1-ba60-4ca6-bc68-4011bb311a3d', '', '', '', '', '', '', '', '', '', '', '', '', 'e91c73a4-5e61-44e5-83ac-f42de65a2c3c', '2024-10-03 03:58:46.389', '2024-10-03 03:58:46.389'),
('fdd7fc8c-09d4-4953-b6bd-162a70c4674e', '146', '3.6', '1.12', '1.37', '6.31', '2.8', '0.45', '2.6', '1.9', '0.4', '55.4', '1.54', '7a0b71f7-4400-4318-af0e-fc23c27171d1', '2024-09-27 04:02:28.128', '2024-10-03 03:59:20.083');

-- --------------------------------------------------------

--
-- Table structure for table `thielesmallparameters4ohm`
--

CREATE TABLE `thielesmallparameters4ohm` (
  `id` varchar(191) NOT NULL,
  `fs` varchar(191) NOT NULL,
  `dcr` varchar(191) NOT NULL,
  `qts` varchar(191) NOT NULL,
  `qes` varchar(191) NOT NULL,
  `qms` varchar(191) NOT NULL,
  `mms` varchar(191) NOT NULL,
  `cms` varchar(191) NOT NULL,
  `bl_product` varchar(191) NOT NULL,
  `vas` varchar(191) NOT NULL,
  `no` varchar(191) NOT NULL,
  `sd` varchar(191) NOT NULL,
  `x_max` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `thielesmallparameters4ohm`
--

INSERT INTO `thielesmallparameters4ohm` (`id`, `fs`, `dcr`, `qts`, `qes`, `qms`, `mms`, `cms`, `bl_product`, `vas`, `no`, `sd`, `x_max`, `productId`, `createdAt`, `updatedAt`) VALUES
('18a9f740-bec9-45eb-b316-dcf8e352f929', '38', '3.6', '1.31', '1.65', '6.31', '85.8', '0.21', '6.7', '35.9', '0.11', '353', '7.8', 'e3770df5-ea15-4be2-85f5-703caecdfd36', '2024-09-26 08:45:25.814', '2024-10-03 03:57:32.758'),
('379063e4-69f1-42a1-948d-116ebcfd68ec', '49', '3', '1.38', '1.71', '7.08', '24.1', '0.44', '3.6', '11.6', '0.08', '136.8', '6.5', '69db9385-8c1f-4863-a07d-30e3fc952ec6', '2024-09-27 00:44:45.469', '2024-10-03 03:58:27.239'),
('38cd38ef-218e-457a-861f-69e94ba10a98', '48.3', '3', '0.86', '1', '6.15', '19.3', '0.56', '4.2', '14.3', '0.16', '134.8', '3.5', '95bba079-4da5-4ac3-8a9a-9fdf23f146b7', '2024-09-27 00:47:16.108', '2024-10-03 03:59:45.620'),
('432665c1-2a2c-4878-9090-68b4f1bde23f', '28', '3.4', '0.99', '1.21', '5.54', '89.5', '0.36', '6.6', '138.5', '0.27', '530.9', '5.7', '3d4dd01e-42bc-41b7-8015-9c5d8afc8f1e', '2024-09-27 03:57:25.080', '2024-10-03 03:59:02.225'),
('4500357b-52a4-450c-90da-de3347d69370', '37', '2.8', '0.74', '0.83', '6.45', '109.1', '0.19', '9', '69.7', '0.35', '514.7', '7.87', 'b912e31b-58aa-4b51-a7d2-f1b80ebdfc0d', '2024-09-26 09:16:45.965', '2024-10-03 03:58:03.851'),
('4830e07c-61df-4558-b482-9d342c659825', '35', '3.0', '0.96', '1.22', '4.65', '80.3', '0.26', '6.6', '94.7', '0.33', '514.7', '7.05', '77932324-df07-44d8-84d2-30af8ae38c0a', '2024-09-26 09:03:32.279', '2024-10-03 03:57:47.491'),
('49d1094d-fb9f-48bb-adbf-3cc13ed062ee', '36', '2.9', '0.95', '1.1', '6.92', '102.2', '0.19', '7.8', '69.6', '0.29', '514.7', '8.03', '963116bc-4fef-48ae-a8e6-f655be756dc7', '2024-09-27 00:32:59.472', '2024-10-03 03:58:11.126'),
('4ab077c1-a342-4039-a78f-793419c4a9dc', '36', '3', '1.13', '1.43', '5.41', '58.1', '0.33', '5.3', '55.9', '0.18', '346.4', '8.04', 'cc2d7eb7-526f-4ffe-923d-4b6c57fb9006', '2024-09-26 08:42:46.176', '2024-10-03 03:57:29.466'),
('514d985b-edd7-46f7-8d22-f9d63b8c6040', '30', '3.4', '0.82', '0.98', '5.02', '83.7', '0.3', '7.6', '52.7', '0.18', '356.3', '7.5', '5fa5a613-16a3-4b8f-92c6-dd2bd7b68f8b', '2024-09-26 08:40:08.959', '2024-10-03 03:57:25.191'),
('5d7610fe-a116-477b-aabd-0c96968d9df4', '43', '3', '1.39', '2.33', '3.46', '81.4', '0.16', '5.3', '64.5', '0.23', '530.9', '8.04', 'c2abeea1-3c8d-4900-af2a-6fcb27bcb738', '2024-09-26 09:10:02.744', '2024-10-03 03:57:56.702'),
('6d3099c3-8102-4d9d-b184-099033a7e666', '37', '3.4', '1.22', '1.5', '6.36', '123.6', '0.14', '8.1', '54.2', '0.19', '518.7', '7.5', '58e4147b-93a0-4809-955d-d04ce1161c5e', '2024-09-26 09:13:30.785', '2024-10-03 03:58:00.593'),
('6d987899-0894-459c-8794-f08d40ccfffb', '32', '3.4', '0.64', '0.75', '4.38', '61.4', '0.39', '7.6', '134.8', '0.61', '498.3', '7.4', '4899e144-b93b-446a-89b4-b055230545ee', '2024-09-26 08:54:03.798', '2024-10-03 03:57:41.626'),
('735661d3-3e31-4d2b-9d4c-2faacf55138a', '32', '3.4', '0.79', '0.95', '4.81', '82.6', '0.29', '7.8', '100.3', '0.35', '494.8', '7.4', '498bc88a-d5e6-4314-ad72-499ea3f1f780', '2024-09-27 00:35:47.582', '2024-10-03 03:58:14.837'),
('84048a4e-d6a5-4228-a34f-6f73e93b00f6', '32', '3', '1.37', '1.82', '5.5', '74.7', '0.3', '5.1', '112.2', '0.22', '514.7', '8.04', 'fdd744f3-a65e-4c33-b2b6-81306f7b47f8', '2024-09-26 09:06:40.262', '2024-10-03 03:57:53.333'),
('8c1d21f7-b361-45f5-84f7-242a60ef7cfd', '33', '3.4', '0.66', '0.76', '5.08', '68.9', '300.7', '8.2', '51.12', '0.27', '346', '7.5', '2e888496-0048-4943-982f-ebfdd4625e1f', '2024-09-26 06:05:26.669', '2024-09-26 06:05:26.669'),
('8dff9604-2e5f-43a7-9fe3-b44264024b08', '38', '3.4', '0.85', '1.02', '5.19', '109.9', '0.23', '8.6', '83.2', '0.25', '510.7', '7.4', '2b1193f0-37cb-4576-9bfc-028cd5694d0e', '2024-09-27 00:38:45.830', '2024-10-03 03:58:18.003'),
('a20273ff-6248-4f58-b1a1-26a9aa86a7a6', '31', '3.4', '0.56', '0.65', '4.06', '41.7', '0.63', '6.5', '41.6', '0.18', '216.4', '4.2', '55fd0ddf-cd00-45a1-8ee0-6fd4231bd69e', '2024-09-27 00:52:27.479', '2024-10-03 03:58:36.106'),
('a2a679eb-0ab3-4613-b9bf-f504c2dce490', '49', '3', '1.6', '1.95', '8.91', '39.2', '0.26', '4.3', '14.7', '0.09', '201.1', '7.1', '4f583bcb-ae46-4e3c-9c77-5525d0f58c1f', '2024-09-26 05:53:17.849', '2024-10-03 03:55:22.663'),
('a7f81967-64c4-457a-b4fa-013a751bada0', '35', '2.9', '0.97', '1.14', '6.53', '102.8', '0.19', '7.7', '72.2', '0.28', '514.7', '7.8', '6f3b950d-f94f-4c21-8e42-7e05251434b4', '2024-09-27 00:29:48.987', '2024-10-03 03:58:07.233'),
('ae840cca-97f1-4c81-855b-a48fcd78e559', '34', '3', '0.79', '0.96', '4.43', '59.7', '0.35', '6.4', '59', '0.25', '346.4', '7.05', '62a47bd6-a0c2-4df9-9cd0-21c496076a5a', '2024-09-26 06:10:25.867', '2024-10-03 03:57:20.177'),
('c48f0155-c45b-4f11-9aa8-ed5ed91bc8fc', '46', '3.3', '0.84', '1.09', '3.69', '30.6', '0.36', '5.2', '20.1', '0.18', '193.6', '4.2', 'b4e5347e-fd18-4b47-a74a-6d90c6e0c305', '2024-09-27 03:59:49.130', '2024-10-03 03:59:06.535'),
('ce45fbc0-4186-461b-9e66-4fa23fb6a6cc', '38', '3.6', '0.91', '1.09', '5.37', '83.4', '0.21', '8.1', '37.2', '0.18', '353', '7.8', '8c29e60a-34c0-4b99-b9bf-104be2655e65', '2024-09-26 08:48:00.035', '2024-10-03 03:57:38.060'),
('ea5b1198-c376-494d-89fc-a05f09bf2d8a', '49', '3', '1.6', '1.95', '8.91', '39.2', '0.26', '4.3', '14.7', '0.09', '201.1', '7.1', 'bd5ecf65-04d8-4b4d-813b-cffd8748b0fa', '2024-09-27 00:49:50.871', '2024-10-03 03:58:31.783'),
('f5ffb87a-ad5c-4b34-aa6b-405e32890c50', '28', '3.2', '0.65', '0.76', '4.59', '61.5', '0.55', '6.9', '94.6', '0.26', '353', '5.7', '42802840-d898-46ea-8377-7e0a9b6a060f', '2024-09-27 03:54:53.622', '2024-10-03 03:58:58.329'),
('f78d1757-d2dd-4a5c-9392-b2567dbf6f6c', '27', '3', '0.76', '0.88', '5.43', '150.64', '0.22', '9.07', '204.9', '0.46', '805.6', '8.7', 'c52ce46f-89a5-4576-a4fd-8a7ae5cf1f53', '2024-09-27 00:42:17.348', '2024-09-27 00:42:17.348');

-- --------------------------------------------------------

--
-- Table structure for table `tweeterspecification`
--

CREATE TABLE `tweeterspecification` (
  `id` varchar(191) NOT NULL,
  `nominal_impedance` varchar(191) NOT NULL,
  `dc_resistance` varchar(191) NOT NULL,
  `voice_coil_diameter` varchar(191) NOT NULL,
  `air_gap_height` varchar(191) NOT NULL,
  `sensitivity` varchar(191) NOT NULL,
  `magnetic_flux_density` varchar(191) NOT NULL,
  `magnet_weight` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `voice_coil_height` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tweeterspecification`
--

INSERT INTO `tweeterspecification` (`id`, `nominal_impedance`, `dc_resistance`, `voice_coil_diameter`, `air_gap_height`, `sensitivity`, `magnetic_flux_density`, `magnet_weight`, `productId`, `createdAt`, `updatedAt`, `voice_coil_height`) VALUES
('08bb45bd-3f1e-473f-9223-ebd73b53cb2e', '4', '3.4', '13.28', '2', '91', '0.65', '0.015', '970f6aa5-91f5-464c-96e4-83f86280d053', '2024-09-27 03:50:56.730', '2024-10-17 06:28:02.548', '1.5'),
('6ceb3d58-d941-4c97-ac34-9291ed27d745', '', '', '', '', '', '', '', '4f583bcb-ae46-4e3c-9c77-5525d0f58c1f', '2024-10-03 03:55:46.925', '2024-10-03 03:55:46.925', ''),
('fe69ccc4-2f16-4cb4-8c93-6fbeeca4f1e1', '', '', '', '', '', '', '', '2e888496-0048-4943-982f-ebfdd4625e1f', '2024-10-03 03:56:36.017', '2024-10-03 03:56:36.017', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(191) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `refresh_token` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `expiredAt` varchar(191) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`, `expiredAt`) VALUES
('25cd8d0d-d185-41e8-9943-fdf1264236f2', 'admin', 'admin', '$argon2id$v=19$m=65536,t=3,p=4$xYxDy6zIa0+RKNnbO77EyQ$8cprXQw0UP+ZsbYBvklz2k+KEhTCNH1pcLfw9mQaN1M', '', '2024-10-04 08:21:24.874', '2024-10-04 08:21:24.874', ''),
('52309261-f2b5-4c3a-bb4d-b61e90fc53ae', 'mkt', 'mkt', '$argon2id$v=19$m=65536,t=3,p=4$o1JuB64vMl5a58jDWRVY7Q$VQrl9IC/Yw6l6h71uU9ZkzB3jyUFPzoALYoc3StGkmg', '', '2024-11-12 07:44:52.252', '2024-11-12 07:44:52.252', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activesubwooferspecification`
--
ALTER TABLE `activesubwooferspecification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `allcategory`
--
ALTER TABLE `allcategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `AllCategory_brandId_idx` (`brandId`);

--
-- Indexes for table `allproductcategory`
--
ALTER TABLE `allproductcategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `AllProductCategory_productId_idx` (`productId`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cover_image`
--
ALTER TABLE `cover_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Cover_Image_productId_idx` (`productId`);

--
-- Indexes for table `drawing_image`
--
ALTER TABLE `drawing_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Drawing_Image_productId_idx` (`productId`);

--
-- Indexes for table `featured_image`
--
ALTER TABLE `featured_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Featured_Image_productId_idx` (`productId`);

--
-- Indexes for table `graph_image`
--
ALTER TABLE `graph_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Graph_Image_productId_idx` (`productId`);

--
-- Indexes for table `image_catalogues`
--
ALTER TABLE `image_catalogues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Image_Catalogues_productId_idx` (`productId`);

--
-- Indexes for table `impedance_image`
--
ALTER TABLE `impedance_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Impedance_Image_productId_idx` (`productId`);

--
-- Indexes for table `multipledatasheetproduct`
--
ALTER TABLE `multipledatasheetproduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `multipleDatasheetProduct_productId_idx` (`productId`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `News_brandId_idx` (`brandId`);

--
-- Indexes for table `news_image`
--
ALTER TABLE `news_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `News_Image_newsId_idx` (`newsId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Product_brandId_idx` (`brandId`),
  ADD KEY `Product_sizeId_idx` (`sizeId`),
  ADD KEY `Product_specId_idx` (`specId`),
  ADD KEY `Product_tweeterSpecId_idx` (`tweeterSpecId`),
  ADD KEY `Product_activeSubwooferSpecId_idx` (`activeSubwooferSpecId`),
  ADD KEY `Product_thieleSmallParameter2OhmId_idx` (`thieleSmallParameter2OhmId`),
  ADD KEY `Product_thieleSmallParameter4OhmId_idx` (`thieleSmallParameter4OhmId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Roles_userId_idx` (`userId`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Size_brandId_idx` (`brandId`);

--
-- Indexes for table `specification`
--
ALTER TABLE `specification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `thielesmallparameters2ohm`
--
ALTER TABLE `thielesmallparameters2ohm`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `thielesmallparameters4ohm`
--
ALTER TABLE `thielesmallparameters4ohm`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tweeterspecification`
--
ALTER TABLE `tweeterspecification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
