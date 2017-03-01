-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 26, 2017 at 04:28 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ltrac`
--

-- --------------------------------------------------------

--
-- Table structure for table `proprietor`
--

CREATE TABLE `proprietor` (
  `proprietor_id` int(11) NOT NULL,
  `proprietor_name` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `proprietor_type` enum('company','private') COLLATE latin1_general_ci NOT NULL,
  `proprietor_registration_number` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `proprietor_telephone_number` varchar(20) COLLATE latin1_general_ci DEFAULT NULL,
  `proprietor_address_line_1` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `proprietor_address_line_2` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `proprietor_address_town` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `proprietor_address_city` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `proprietor_address_postcode` varchar(255) COLLATE latin1_general_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `proprietor`
--
ALTER TABLE `proprietor`
  ADD PRIMARY KEY (`proprietor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `proprietor`
--
ALTER TABLE `proprietor`
  MODIFY `proprietor_id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
