SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `hardbank` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `hardbank`;

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date_time` datetime NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(60) NOT NULL,
  `balance` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `username`, `password`, `balance`) VALUES
(1, 'carljohnson', '$2a$10$ego.DsmjO1UNoXzP4PYtLe9qmg6wLMHfeOfjYKces9ZGXl1qZEPYa', '90.99'),
(2, 'johnwidth', '$2a$10$gTZvMRacrOPxbXMUvwBcP.yxeCt5AVYMTaBnlU2SnlyyRslMCq5ZS', '45.00'),
(3, 'johndoe', '$2a$10$bCApObFddplzr6RY5zHoneljRSO8/e6/rpkTmD82t1oc0TNss.FYm', '155.00'),
(4, 'imbigsmoke', '$2a$10$wWDyvhrzsHlvgvBnftKCc.WFU4lW27j1.HNTQZ932Y/Y7Mki7iuLW', '107.02'),
(5, 'ryder10', '$2a$10$IADAIcpGNxgtmn8LAF6Sxuor8ar0M.jrIJ1AaM0qbTlukAIdhU6LS', '101.01'),
(8, 'janedoe', '$2a$10$wNJSZoVi349bb1iq4NX21.noP8eJZjlJ/MV/0YHdsN4wKQaiImFFW', '0.98');


ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;


ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
