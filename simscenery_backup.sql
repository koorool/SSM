-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Час створення: Січ 24 2015 р., 16:04
-- Версія сервера: 5.6.21
-- Версія PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База даних: `simscene_db1`
--

-- --------------------------------------------------------

--
-- Структура таблиці `Admin`
--

CREATE TABLE IF NOT EXISTS `Admin` (
  `user` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `pass` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп даних таблиці `Admin`
--

INSERT INTO `Admin` (`user`, `pass`) VALUES
('Admin', '$2y$10$oidR0XkRj7.sUoPVOSHaBeRBYBaawpkAKoHnsmVBN4TRNFQI.9abW');

-- --------------------------------------------------------

--
-- Структура таблиці `marker`
--

CREATE TABLE IF NOT EXISTS `marker` (
  `code` char(4) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lat` double(16,13) NOT NULL,
  `lng` double(16,13) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `city` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `marker`
--

INSERT INTO `marker` (`code`, `name`, `lat`, `lng`, `type`, `city`) VALUES
('brdc', 'berdicev', 49.8946343957342, 28.6523437500000, 2, NULL),
('CHRN', 'Черновцы', 48.4583518828087, 25.9936523437500, 1, NULL),
('dfg', 'dfg', 51.1517861014304, 33.0688476562500, 2, NULL),
('dfge', 'dlkjn', 50.0077390146369, 25.4003906250000, 2, NULL),
('dfhg', 'fdhg', 49.5822260446217, 36.9580078125000, 2, 'dfhg'),
('dflh', 'dsflhg', 49.4538425943307, 36.1669921875000, 1, ''),
('gasm', 'dfgh', 48.9513664709477, 29.4873046875000, 2, ''),
('KEV', 'Київ', 50.5553249825197, 30.5200195312500, 0, NULL),
('khml', 'Хмельницький', 49.5679778589272, 27.0703125000000, 0, ''),
('KHRK', 'Харків', 50.0500847783826, 36.2109375000000, 0, NULL),
('KRRH', 'kryvy rih', 48.0780789434986, 33.4423828125000, 1, NULL),
('Liby', 'Лівія', 27.6835280837878, 22.8515625000000, 0, NULL),
('LNDN', 'London', 51.3443386605992, -0.1318359375000, 1, NULL),
('MELT', 'melitipol', 46.9202553153745, 35.4418945312500, 1, NULL),
('mldv', 'moldova', 47.9457864636872, 27.9931640625000, 1, NULL),
('Perv', 'Первомайськ', 48.1367666796927, 30.7836914062500, 2, ''),
('polt', 'Poltava/Полтава', 49.8521516677700, 34.4091796875000, 0, 'Полтава'),
('ppip', 'kjhkjn', 48.9657938146106, 36.4526367187500, 0, 'dlkjgnh'),
('RIVN', 'RIvne', 50.8059347267691, 26.2353515625000, 0, NULL),
('RMNA', 'Румунія', 47.0850853599538, 25.4882812500000, 1, NULL),
('sadf', 'Berlin', 52.9353966586232, 12.0410156250000, 1, NULL),
('sdfg', 'sdfg', 50.3033757535631, 32.8930664062500, 2, NULL),
('sdlj', 'dlj', 48.6038576082325, 36.5185546875000, 2, ''),
('summ', 'summ', 50.3734961443035, 34.8486328125000, 1, NULL),
('Sumy', 'sumy', 50.5134265263396, 33.9257812500000, 0, NULL),
('UKBB', 'Boryspil', 50.3384488872548, 30.8942413330078, 2, ''),
('UKDD', 'Dnepr', 48.3567053014027, 35.1026916503906, 1, 'Дніпропетровськ'),
('UKKE', 'Черкасы', 49.4031544287256, 32.0108985900879, 2, ''),
('wert', 'wrtwrt', 49.1673386062911, 34.6508789062500, 1, 'wert'),
('wery', 'sjghsdkyh', 48.0193241848012, 37.7929687500000, 1, 'skdjlfg'),
('ZIT', 'Zhitomir/Житомир', 50.3454604086048, 28.7622070312500, 1, NULL);

-- --------------------------------------------------------

--
-- Структура таблиці `markerinfo`
--

CREATE TABLE IF NOT EXISTS `markerinfo` (
  `code` char(4) NOT NULL,
  `description` varchar(256) NOT NULL,
  `scenery_free` varchar(500) DEFAULT NULL,
  `scenery` varchar(500) DEFAULT NULL,
  `scenery_label` varchar(256) DEFAULT NULL,
  `scenery_free_label` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `markerinfo`
--

INSERT INTO `markerinfo` (`code`, `description`, `scenery_free`, `scenery`, `scenery_label`, `scenery_free_label`) VALUES
('brdc', 'dsfg', '1', '', NULL, NULL),
('CHRN', 'sjd', 'kdsjflnv', '', NULL, NULL),
('dfg', 'dfhg', 'dhgfdhg', 'dghdfhg', NULL, NULL),
('dfge', 'skdjnb', 'sdkjfn', '', NULL, NULL),
('dfhg', 'dfhg', 'dfhg', 'dfhg', NULL, NULL),
('dflh', 'dgh', '', 'sdlhg', '', ''),
('gasm', 'dlfjg', 'dlfjg', '1', NULL, NULL),
('KEV', 'dknbv', 'nn', '', NULL, NULL),
('khml', 'bdkn', 'sd', '', NULL, NULL),
('KHRK', 'slkfnv', 'slkjnwle', '', NULL, NULL),
('KRRH', 'lkdfn', 'dksfhg', '', NULL, NULL),
('Liby', 'dkfhg', 'dskfhg', '1', NULL, NULL),
('LNDN', 'dkfhg', 'dsfkhg', '1', NULL, NULL),
('MELT', 'kjldn', 'ldjnoiu', '', NULL, NULL),
('mldv', 'sfg', 'sdfg', '1', NULL, NULL),
('Perv', 'jhbjh', 'jln', 'sdlfjg', NULL, NULL),
('polt', 'wert', 'flkhg', '', NULL, NULL),
('ppip', 'dlfn', 'kdng', '', NULL, NULL),
('RIVN', 'dflnb', 'kldfzn', '', NULL, NULL),
('RMNA', 'dsfkgh', 'sdfg', '1', NULL, NULL),
('sadf', 'dhgj', 'sdfg', '1', NULL, NULL),
('sdfg', 'sdfg', '1', '1', NULL, NULL),
('sdlj', '', 'lsdkh', 'dlkjhg', NULL, NULL),
('summ', 'dlkfjhg', '', 'dksfjhg', NULL, NULL),
('Sumy', 'sdfg', 'dlkhgsdkljfhg', '', NULL, NULL),
('UKBB', 'bdkjnb', 'lkfn', '1', 'empty link', 'label for link'),
('UKDD', 'Січеслав', ' http://www.avsimrus.com/files.phtml?fileid=51665', '1', NULL, 'label_new'),
('UKKE', 'dknbv', ' http://www.avsimrus.com/files.phtml?fileid=45349', '1', 'awyriebvuse', ''),
('wert', 'wretwert', '', 'wretw', NULL, NULL),
('wery', 'sdjkfhg', '', 'sldfkhg', NULL, NULL),
('ZIT', 'dlfsnb', 'kljvn', '', NULL, NULL);

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `Admin`
--
ALTER TABLE `Admin`
 ADD UNIQUE KEY `UUID` (`user`);

--
-- Індекси таблиці `marker`
--
ALTER TABLE `marker`
 ADD PRIMARY KEY (`code`);

--
-- Індекси таблиці `markerinfo`
--
ALTER TABLE `markerinfo`
 ADD PRIMARY KEY (`code`);

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `markerinfo`
--
ALTER TABLE `markerinfo`
ADD CONSTRAINT `markerinfo_ibfk_1` FOREIGN KEY (`code`) REFERENCES `marker` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
