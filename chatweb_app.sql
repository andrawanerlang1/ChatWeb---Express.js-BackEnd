-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 20 Feb 2021 pada 00.04
-- Versi server: 10.4.14-MariaDB
-- Versi PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chatweb_app`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `friendlist`
--

CREATE TABLE `friendlist` (
  `friendlist_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `friendlist`
--

INSERT INTO `friendlist` (`friendlist_id`, `user_id`, `friend_id`, `created_at`, `status`) VALUES
(43, 1, 3, '2021-02-19 12:15:16', 1),
(44, 3, 1, '2021-02-19 12:17:13', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `message`
--

CREATE TABLE `message` (
  `message_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  `message` varchar(300) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `message`
--

INSERT INTO `message` (`message_id`, `room_id`, `sender`, `receiver`, `message`, `created_at`) VALUES
(167, 765151, 1, 3, '1', '2021-02-20 04:53:23'),
(168, 765151, 3, 1, '2', '2021-02-20 04:53:25'),
(169, 765151, 1, 3, '3', '2021-02-20 04:53:27'),
(170, 765151, 3, 1, '4', '2021-02-20 04:53:29'),
(171, 765151, 3, 1, '123', '2021-02-20 04:53:47');

-- --------------------------------------------------------

--
-- Struktur dari tabel `room`
--

CREATE TABLE `room` (
  `room_id_uniq` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `user_a` int(11) NOT NULL,
  `user_b` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `room`
--

INSERT INTO `room` (`room_id_uniq`, `room_id`, `user_a`, `user_b`, `created_at`, `status`) VALUES
(30, 765151, 3, 1, '2021-02-19 19:13:14', 1),
(31, 765151, 1, 3, '2021-02-19 19:13:14', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_image` varchar(100) NOT NULL,
  `user_number` varchar(16) NOT NULL,
  `user_lat` decimal(9,8) NOT NULL,
  `user_lng` decimal(9,6) NOT NULL,
  `user_bio` varchar(300) NOT NULL,
  `user_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` datetime NOT NULL,
  `user_status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_name`, `user_password`, `user_image`, `user_number`, `user_lat`, `user_lng`, `user_bio`, `user_created_at`, `user_updated_at`, `user_status`) VALUES
(1, 'asd@asd', 'Rudy G', '$2b$10$mA4E9Q6EC84ouAHQY5AWEO7phM9EhmfyknlBkQsEWebhyuSi7iKqi', '2021-01-23T11-41-50.530Z3a389b0d-5b3f-4e25-99da-2da6f0f232d0.jpg', '088290056348', '-6.24332390', '107.060330', 'Hello there, i am a fullstack developer!', '2021-01-21 13:00:45', '2021-01-23 11:41:50', 1),
(3, 'dsa@dsa', 'Vespa Matic', '$2b$10$mA4E9Q6EC84ouAHQY5AWEO7phM9EhmfyknlBkQsEWebhyuSi7iKqi', '2021-01-26T04-30-21.356Z08ede0fc-2fbe-4bf1-ac47-eb680a02c212.jpg', '16045', '-6.70666932', '107.595857', 'brem breeem', '2021-01-21 13:57:24', '2021-02-19 11:30:02', 1),
(4, 'hehe@he', 'dasdasd', '$2b$10$mA4E9Q6EC84ouAHQY5AWEO7phM9EhmfyknlBkQsEWebhyuSi7iKqi', '', '', '0.00000000', '0.000000', '', '2021-01-21 13:57:39', '0000-00-00 00:00:00', 1),
(5, 'andra@1', 'Andra 1', '$2b$10$JJZvHnd4QbCfXy.6f.28sO8mkoEhgwwP2B9RKiWlbGREP/MFZ72x2', '2021-01-23T17-08-10.588Z1600265022806_357490867_2.jpg', '1', '-6.23999950', '107.065767', 'i am andra one', '2021-01-23 17:06:27', '2021-01-23 17:08:10', 1),
(6, 'andra@2', 'Andra 2', '$2b$10$GI3RLSjoHlmk3RQsAc.qRuxqZ0t/5a2htBGJ4R/kC0TWeAjf.J9WC', '2021-01-23T17-08-45.911Z51oW-Q2unWL._AC_SL1000_.jpg', '2', '-6.23999950', '107.065767', 'i am andra two', '2021-01-23 17:06:38', '2021-01-23 17:08:59', 1),
(7, 'andra@4', 'Andra 3', '$2b$10$JXzRoQ/tZu6kMAaYXg6Yxu7OOdD9vEjF6JjIN0U2i/eZsaZPb6.gy', '', '', '0.00000000', '0.000000', '', '2021-01-23 17:06:45', '0000-00-00 00:00:00', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `friendlist`
--
ALTER TABLE `friendlist`
  ADD PRIMARY KEY (`friendlist_id`);

--
-- Indeks untuk tabel `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`message_id`);

--
-- Indeks untuk tabel `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id_uniq`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `friendlist`
--
ALTER TABLE `friendlist`
  MODIFY `friendlist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT untuk tabel `message`
--
ALTER TABLE `message`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT untuk tabel `room`
--
ALTER TABLE `room`
  MODIFY `room_id_uniq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
