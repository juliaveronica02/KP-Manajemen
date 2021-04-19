-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2021 at 04:23 AM
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
-- Database: `collab`
--

-- --------------------------------------------------------

--
-- Table structure for table `checkout`
--

CREATE TABLE `checkout` (
  `id` int(11) NOT NULL,
  `dish_id` int(11) DEFAULT NULL,
  `quantity` bigint(15) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `checkout`
--

INSERT INTO `checkout` (`id`, `dish_id`, `quantity`, `createdAt`, `updatedAt`) VALUES
(1, 1, 30, '2021-04-08 16:51:46', '2021-04-08 16:51:46'),
(2, 1, 40, '2021-04-08 18:55:56', '2021-04-08 18:55:56'),
(3, 1, 45, '2021-04-08 19:06:43', '2021-04-08 19:06:43');

--
-- Triggers `checkout`
--
DELIMITER $$
CREATE TRIGGER `reduces_stock` AFTER INSERT ON `checkout` FOR EACH ROW BEGIN
	UPDATE Dish SET quantity = Dish.quantity - NEW.quantity
        WHERE id = NEW.dish_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dish`
--

CREATE TABLE `dish` (
  `id` int(11) NOT NULL,
  `dishName` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `imageURL` text NOT NULL,
  `quantity` bigint(15) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dish`
--

INSERT INTO `dish` (`id`, `dishName`, `description`, `imageURL`, `quantity`, `createdAt`, `updatedAt`) VALUES
(1, 'Bawang Merah', 'Nasi goreng, mie ayam bakso, dll', 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Onions.jpg', 55, '2021-04-08 16:29:22', '2021-04-08 16:29:22');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `id` int(11) NOT NULL,
  `dish_id` int(11) DEFAULT NULL,
  `addQuantity` bigint(15) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `dish_id`, `addQuantity`, `createdAt`, `updatedAt`) VALUES
(1, 1, 50, '2021-04-08 16:29:50', '2021-04-08 16:29:50'),
(2, 1, 50, '2021-04-08 18:59:22', '2021-04-08 18:59:22'),
(3, 1, 50, '2021-04-10 14:16:46', '2021-04-10 14:16:46');

--
-- Triggers `stock`
--
DELIMITER $$
CREATE TRIGGER `add_Stock` BEFORE INSERT ON `stock` FOR EACH ROW BEGIN
IF NOT EXISTS (SELECT * FROM Dish WHERE id = NEW.dish_id) THEN
    	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ID Product Not Found';
    ELSE
    	UPDATE Dish SET quantity = NEW.addQuantity + quantity WHERE id = NEW.dish_id;
    END IF;
END
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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `phone`, `createdAt`, `updatedAt`) VALUES
(1, 'a', 'a@gmail.com', '$2b$12$BXE77JldothGHP79f6/1eOhqxw98E0HBb92baj0dePUv6N/.ykR.m', 124553, '2021-04-08 18:27:23', '2021-04-08 18:27:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `checkout`
--
ALTER TABLE `checkout`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dish`
--
ALTER TABLE `dish`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
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
-- AUTO_INCREMENT for table `checkout`
--
ALTER TABLE `checkout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dish`
--
ALTER TABLE `dish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
