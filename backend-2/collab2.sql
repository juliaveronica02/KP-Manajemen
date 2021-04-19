-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2021 at 04:22 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `collab2`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_stock`
--

CREATE TABLE `add_stock` (
  `id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `add_stock`
--

INSERT INTO `add_stock` (`id`, `dish_id`, `quantity`, `createdAt`, `updatedAt`) VALUES
(1, 1, 30, '2021-04-02 17:39:23', '2021-04-02 17:39:23'),
(2, 1, 30, '2021-04-10 14:27:27', '2021-04-10 14:27:27'),
(3, 1, 30, '2021-04-10 15:00:24', '2021-04-10 15:00:24'),
(4, 1, 30, '2021-04-10 15:00:49', '2021-04-10 15:00:49'),
(5, 1, 2, '2021-04-19 01:57:49', '2021-04-19 01:57:49');

--
-- Triggers `add_stock`
--
DELIMITER $$
CREATE TRIGGER `addStock` BEFORE INSERT ON `add_stock` FOR EACH ROW BEGIN
IF NOT EXISTS (SELECT * FROM Dish WHERE id = NEW.dish_id) THEN
    	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ID Product Not Found';
    ELSE
    	UPDATE Dish SET quantity = NEW.quantity + quantity WHERE id = NEW.dish_id;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Onion', '2021-04-02 16:36:28', '2021-04-02 16:38:21');

-- --------------------------------------------------------

--
-- Table structure for table `dish`
--

CREATE TABLE `dish` (
  `id` int(11) NOT NULL,
  `image` text NOT NULL,
  `description` text NOT NULL,
  `name` text NOT NULL,
  `category_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categories` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dish`
--

INSERT INTO `dish` (`id`, `image`, `description`, `name`, `category_id`, `quantity`, `createdAt`, `updatedAt`, `categories`) VALUES
(1, 'public\\images\\dish\\1617383571041-23. Setrika Fresh Red 1 L.png', 'lorem ipsum', 'White Onion', 1, -3, '2021-04-02 17:12:51', '2021-04-02 17:12:51', ''),
(2, 'public\\images\\dish\\1618486272260-35. Karbol Sereh 1 L.png', '', '', 0, 0, '2021-04-10 16:19:28', '2021-04-15 11:31:12', ''),
(9, 'public\\images\\dish\\1618390271617-126866_1024x768-anime-wallpapers-desktop-backgrounds-hd_1024x768_h.jpg', 'q', 'q', 1, 20, '2021-04-14 08:51:11', '2021-04-14 08:51:11', 'item'),
(10, 'public\\images\\dish\\1618390721516-126866_1024x768-anime-wallpapers-desktop-backgrounds-hd_1024x768_h.jpg', 'qwerty', 'demit', 1, 30, '2021-04-14 08:58:41', '2021-04-14 08:58:41', 'item'),
(11, 'public\\images\\dish\\1618390936009-126866_1024x768-anime-wallpapers-desktop-backgrounds-hd_1024x768_h.jpg', 'qw', 'qwerr', 1, 1, '2021-04-14 09:02:16', '2021-04-14 09:02:16', 'item'),
(12, 'public\\images\\dish\\1618485292123-126866_1024x768-anime-wallpapers-desktop-backgrounds-hd_1024x768_h.jpg', 'q', 'q', 0, 1, '2021-04-15 11:14:52', '2021-04-15 11:14:52', 'One'),
(13, 'public\\images\\dish\\1618586395585-126866_1024x768-anime-wallpapers-desktop-backgrounds-hd_1024x768_h.jpg', 'q\nq\nq\n\nq', 'a', 0, 1, '2021-04-16 15:19:55', '2021-04-16 15:19:55', 'Two');

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `id` int(11) NOT NULL,
  `image` text NOT NULL,
  `store_name` varchar(70) NOT NULL,
  `sales_name` varchar(70) NOT NULL,
  `address` text NOT NULL,
  `phone` bigint(15) NOT NULL,
  `price` bigint(20) NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`id`, `image`, `store_name`, `sales_name`, `address`, `phone`, `price`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'public\\images\\invoice\\1617392385073-23. Setrika Fresh Red 1 L.png', 'test', 'a', '', 214214, 20000, 'lorem ipsum', '2021-04-02 19:39:45', '2021-04-02 19:39:45'),
(2, 'public\\images\\invoice\\1617392392549-23. Setrika Fresh Red 1 L.png', 'test', 'a', '', 214214, 10000, 'lorem ipsum', '2021-04-02 19:39:52', '2021-04-02 19:39:52'),
(3, 'public\\images\\invoice\\1618506759465-126866_1024x768-anime-wallpapers-desktop-backgrounds-hd_1024x768_h.jpg', 'A', 'A', '', 253254, 15000, 'q\nq\n\nq', '2021-04-15 17:12:39', '2021-04-15 17:12:39'),
(4, 'public\\images\\invoice\\1618506874344-126866_1024x768-anime-wallpapers-desktop-backgrounds-hd_1024x768_h.jpg', 'B', 'B', '', 34141, 500, 'B\nB\nB', '2021-04-15 17:14:34', '2021-04-15 17:14:34'),
(5, 'public\\images\\invoice\\1618506943168-126866_1024x768-anime-wallpapers-desktop-backgrounds-hd_1024x768_h.jpg', 'C', 'C', 'C\nC\nC', 1341344, 3155, 'C\nC\nC', '2021-04-15 17:15:43', '2021-04-15 17:15:43');

-- --------------------------------------------------------

--
-- Table structure for table `reduce_stock`
--

CREATE TABLE `reduce_stock` (
  `id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reduce_stock`
--

INSERT INTO `reduce_stock` (`id`, `dish_id`, `quantity`, `createdAt`, `updatedAt`) VALUES
(1, 1, 5, '2021-04-02 17:54:06', '2021-04-02 17:54:06'),
(2, 1, 60, '2021-04-10 14:48:09', '2021-04-10 14:48:09'),
(3, 1, 20, '2021-04-10 14:48:20', '2021-04-10 14:48:20'),
(4, 1, 55, '2021-04-10 15:00:58', '2021-04-10 15:00:58'),
(5, 1, 5, '2021-04-10 15:17:06', '2021-04-10 15:17:06');

--
-- Triggers `reduce_stock`
--
DELIMITER $$
CREATE TRIGGER `checkoutStock` AFTER INSERT ON `reduce_stock` FOR EACH ROW UPDATE Dish SET quantity = Dish.quantity - NEW.quantity
        WHERE id = NEW.dish_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(70) NOT NULL,
  `email` varchar(70) NOT NULL,
  `password` text NOT NULL,
  `phone` bigint(15) NOT NULL,
  `image` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `phone`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'a', 'a@gmail.com', '$2b$12$3tnXJcC3C8mSRQXs.y9doeJPRKvQyGQN7KSqrH.0U2R3KA5gEGIsu', 1234, '/avatar.png', '2021-04-01 17:11:22', '2021-04-01 17:11:22'),
(2, 'b', 'b@gmail.com', '$2b$12$v26CDJFh1YcQpxfkiQSESODXTINA/nQGlSWFMRcw8CVMEwegrO27y', 124553, '/avatar.png', '2021-04-01 17:47:13', '2021-04-01 17:47:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_stock`
--
ALTER TABLE `add_stock`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dish`
--
ALTER TABLE `dish`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reduce_stock`
--
ALTER TABLE `reduce_stock`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_stock`
--
ALTER TABLE `add_stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `dish`
--
ALTER TABLE `dish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reduce_stock`
--
ALTER TABLE `reduce_stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
