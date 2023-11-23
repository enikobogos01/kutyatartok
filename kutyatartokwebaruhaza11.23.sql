-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Nov 23. 11:25
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `kutyatartokwebaruhaza`
--

DELIMITER $$
--
-- Eljárások
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteAllUsers` ()   BEGIN
    DELETE FROM users;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `desc` varchar(680) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `supplier` varchar(50) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `category` enum('nyakorv','ham','poraz','jatek') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `desc`, `quantity`, `supplier`, `image_path`, `category`) VALUES
(1, 'Zöld Plüss Kutya Játék', 2900, 'Fedezd fel a vidámságot és puhaságot a Zöld Plüss Kutya Játékkal! Ez a kedves játék nemcsak szórakozást nyújt, hanem puha, kényelmes társ is lehet a kis kedvenced számára. Kiváló minőségű, zöld színű plüss anyagból készült, amely kellemes tapintású és tartós. A játék nemcsak szórakoztató, de biztonságos is, hiszen erős varrásokkal és ellenálló anyagokkal készült.\r\nA termék mérete: 25 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek1.jpg', 'jatek'),
(2, 'Narancssárga Kemény Gumi Labda', 2100, 'Ezzel a Narancssárga Kemény Gumi Labdával garantáltan felejthetetlen és aktív időt tölthet el kutyáddal. A kemény gumi anyag biztosítja a hosszú élettartamot, és a labda ideális mérete könnyűvé teszi a játékot minden kutyatulajdonos számára.\r\nA termék mérete: 6 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek2.jpg\r\n', 'jatek'),
(3, 'Narancssárga Plüss Majom', 3800, 'Fedezd fel a vidámságot és puhaságot a Narancssárga Plüss Majommal! Ez a kedves plüss játék nemcsak aranyos, de puha és kényelmes is, ideális társ a kis kedvenced számára. Ezzel a Narancssárga Plüss Majommal garantáltan feldobja mindennapjait, és kényelmes társ lesz a játékban és a pihenésben egyaránt.\r\nA termék mérete: 25 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek3.jpg', 'jatek'),
(4, 'Barna Plüss Maci', 3700, 'Fedezd fel a puhaságát és báját a Barna Plüss Macival! Ez a kedves játékmaci nem csak aranyos, hanem puha és kényelmes is, tökéletes társ a kis kedvenced számára. Ezzel a Barna Plüss Macival garantáltan mosolyt csalsz kis kedvenced arcára, és egy kényelmes játék- és alvópartnert is biztosítasz számára.\r\nA termék mérete: 25 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek4.jpg', 'jatek'),
(5, 'Sárga Plüss Állat', 3400, 'Fedezd fel a varázslatát a Sárga Plüss Állattal! Ez a különleges játék nem csak szórakoztató, hanem rejtélyes és színes kiegészítője is lehet kis kedvenced napjainak. Ezzel a Sárga Plüss Állattal nemcsak egy aranyos játékot kapsz, hanem egy egyedi és szórakoztató kiegészítőt is a kutyád számára. Kíváncsiságát felkeltve és örömet szerezve lesz a napja!\r\nA termék mérete: 24 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek5.jpg', 'jatek'),
(6, 'Zöld - Szürke Labda', 2200, 'Ez a Zöld Labda nem csupán egy egyszerű játék, hanem egy olyan kiegészítő, amely feldobja kutyád mindennapjait és örömöt hoz a közös játékba. Légy részese a vidám pillanatoknak, és élvezd a kutyáddal való együtt töltött időt!\r\nA termék mérete: 6 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek6.jpg', 'jatek'),
(7, 'Sárga - Kék Labda', 2200, 'Fedezd fel a vibráló színek harmonikus találkozását a Sárga - Kék Labdával! Ez a lenyűgöző játék nem csak szórakoztató, de a színek dinamikus kombinációjával is elkápráztatja kutyád és a játék iránt érdeklődők szemét. Élvezd a színek dinamikus táncát minden játék alkalmával!\r\nA termék mérete: 6 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek7.jpg', 'jatek'),
(8, 'Nagy Teniszlabda', 2900, 'Fedezd fel a hagyomány és a mozgás örömét a Nagy Teniszlabdával! Ez a hagyományos játék nemcsak egyszerű, de kiválóan alkalmas a kutyád aktív szórakoztatására és mozgására. Egyszerű, mégis hatékony eszköz a kutyád szórakoztatásához és mozgásához. Élvezd a játékos pillanatokat a hagyományok és a kutyaszeretet jegyében!\r\nA termék mérete: 12 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek8.jpg', 'jatek'),
(9, 'Narancssárga - Szürke Labda', 2200, 'Ez a Narancssárga - Szürke Labda nem csupán egy egyszerű játék, hanem egy olyan kiegészítő, amely feldobja kutyád mindennapjait és örömöt hoz a közös játékba. Légy részese a vidám pillanatoknak, és élvezd a kutyáddal való együtt töltött időt!\r\nA termék mérete: 6 cm.\r\n\r\n', 10, 'Forgalmazó', 'imgs/productPhotos/jatek9.jpg', 'jatek'),
(10, 'Narancssárga Lyukacsos Gumilabda', 2300, 'Fedezd fel a játék és a frissítő szín találkozását a Narancssárga Lyukacsos Gumilabdával! Ez a különleges játék nemcsak élénk és szórakoztató, de a lyukakkal rendelkező kialakítása izgalmasabbá teszi kutyád játékidejét.\r\nA termék mérete: 6 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek10.jpg', 'jatek'),
(11, 'Zöld Csontalakú Gumi Rágóka', 3300, 'Ismerd meg a Zöld Csontalakú Gumi Rágókát, a kutyád számára tervezett prémium rágókát! Ez a stílusos és strapabíró játék nem csak szórakoztató, de kiválóan alkalmas a rágás szükségleteinek kielégítésére és a fogak egészségének támogatására. Legyen ez az új kedvenc rágója!\r\nA termék mérete: 16 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek11.jpg', 'jatek'),
(12, 'Könnyű Focilabda Kutyáknak', 5200, 'Ismerd meg a Könnyű Focilabdát Kutyáknak, a tökéletes játékszert, amely könnyű és strapabíró, ideális kutyád aktív szórakoztatására! Ez a labda nem csak könnyebb, mint az eredeti focilabda, de a strapabíró anyagnak köszönhetően hosszú órákon át tartó játékot biztosít.\r\nA termék mérete: 60 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek12.jpg', 'jatek'),
(13, 'Színes Frizbi', 2100, 'Fedezd fel a vidám és aktív időtöltést a Színes Frizbivel! Ez a szórakoztató játék ideális a kutyád számára, hogy szabadban űzhesse a játékot, miközben a színes design fokozza a szórakozás élményét. Egy kiváló kiegészítő a kutyád számára, amely nem csak szórakoztató, hanem segíti az aktív mozgást és szabadban való játékot. Élvezd a közös időtöltést ezen vidám és könnyű játékkal!\r\nA termék mérete: 24 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek13.jpg', 'jatek'),
(14, 'Narancssárga Sípoló Labda', 2200, 'Ismerd meg a Narancssárga Sípoló Labdát, a szórakoztató játékelemet, amely garantáltan felkelti kutyád érdeklődését és játékszenvedélyét! Ez a labda nem csak színes és vidám, de sípoló funkciója révén még izgalmasabbá teszi a játékot. Nem csak szórakoztató, hanem segíti is a kutyád fogápolását és aktív időtöltését. Kiváló választás az egészséges játékhoz és interakcióhoz!\r\nA termék mérete: 6 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek14.jpg', 'jatek'),
(15, 'Puha Kosárlabda Kutyáknak', 5300, 'Ismerd meg a Puha Kosárlabdát Kutyáknak, a tökéletes játékot a kis kedvenceid aktív időtöltéséhez! Ez a kisebb méretű, könnyű és puha labda kiválóan alkalmas kutyád szórakoztatására és játékra. Egy szórakoztató és interaktív játékelem, amely garantáltan örömet szerez a kutyádnak, miközben a könnyű és puha kialakítás biztosítja a játék biztonságát és kényelmét. Legyen ez a labda a következő kutyajáték a repertoáron!\r\nA termék mérete: 58 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek15.jpg', 'jatek'),
(16, 'Narancssárga Köteles Játék', 3100, 'Fedezd fel a kutyád számára tervezett Narancssárga Köteles Játékot, amely nem csak szórakoztató, de segíti is a fogápolást és rágási szokások kialakítását! Ez a játék kiváló választás a kutyád aktív és egészséges szórakoztatására. Nem csak szórakoztató, hanem segíti is a kutyád fogápolását és aktív időtöltését. Kiváló választás az egészséges játékhoz és interakcióhoz!\r\nA termék mérete: 30 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek16.jpg', 'jatek'),
(17, 'Sötétbarna Plüss Maci', 3700, 'Ismerd meg a Sötétbarna Plüss Macit, a puhaság és báj tökéletes kombinációját! Ez a kiváló minőségű plüss játékmaci nemcsak aranyos, hanem puha tapintású is, ideális társ a kis kedvenced számára a játékban és a pihenésben. Nem csak egy játék, hanem egy hűséges és puha társ is, aki mindig készen áll arra, hogy örömöt szerezzen és kényeztessen. Legyen ez a bájos játékmaci a következő kedvenc alvótársa vagy játékpartnere!\r\nA termék mérete: 26 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek17.jpg', 'jatek'),
(18, 'Klasszikus Teniszlabda', 2000, 'Fedezd fel a hagyomány és a mozgás örömét a Klasszikus Teniszlabdával! Ez a hagyományos játék nemcsak egyszerű, de kiválóan alkalmas a kutyád aktív szórakoztatására és mozgására. Egyszerű, mégis hatékony eszköz a kutyád szórakoztatásához és mozgásához. Élvezd a játékos pillanatokat a hagyományok és a kutyaszeretet jegyében! A termék mérete: 6 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek18.jpg', 'jatek'),
(19, 'Tömör Gumi Bot Játék', 3400, 'Ismerd meg a Tömör Gumi Bot Játékot, a kiváló minőségű és strapabíró játékot kutyádnak! Ez a tömör gumi bot ideális választás az aktív játékhoz és rágási igények kielégítéséhez. Kiváló választás azoknak a kutyatulajdonosoknak, akik egy tartós és egyszerű játékot keresnek kutyájuknak. Legyen ez a bot a következő kedvenc játékja!\r\nA termék mérete: 38 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek19.jpg', 'jatek'),
(20, 'Sípolós Gumi Malac Játék', 3600, 'Ismerd meg a Sípolós Gumi Malac Játékot, a vidám és interaktív játékelemet kutyádnak! Ez a játékmalac kiváló minőségű, tartós gumi anyagból készült, és sípoló funkcióval rendelkezik, hogy még izgalmasabbá tegye a játékot. Egy szórakoztató és színvonalas játékelem, amely nemcsak kielégíti a rágási igényeket, hanem örömet is szerez a kutyádnak. Legyen ez a vidám malac a következő kedvenc játéka!\r\nA termék mérete: 24 cm.', 10, 'Forgalmazó', 'imgs/productPhotos/jatek20.jpg', 'jatek'),
(21, 'Barna Bőr Póráz', 3000, 'A Barna Bőr Póráz elegancia és funkcionalitás tökéletes egyensúlyát nyújtja minden kutyatulajdonosnak. Kiváló minőségű barna bőrből készült, ez a póráz nemcsak stílusos kiegészítője kutyád sétájának, hanem strapabíró és tartós is.\r\nA póráz hossza 2 méter.', 10, 'Forgalmazó', 'imgs/productPhotos/poraz1.jpg', 'poraz'),
(22, 'Sárga Póráz', 2900, 'A Sárga Póráz frissességet és vidámságot hoz a kutyasétákba. Ez a praktikus és stílusos póráz nem csupán kényelmes irányítást biztosít, hanem kutyád megjelenését is feldobja.\r\nA póráz hossza 2 méter.', 10, 'Forgalmazó', 'imgs/productPhotos/poraz2.jpg', 'poraz'),
(23, 'Fehér Póráz', 3200, 'A Fehér Póráz egyszerű eleganciát és tisztaságot sugároz, és kiváló választás a stílusos és kényelmes kutyasétákhoz. Készült strapabíró anyagból, hogy a mindennapos használat során is megállja a helyét.\r\nA póráz hossza 2 méter.', 10, 'Forgalmazó', 'imgs/productPhotos/poraz3.jpg', 'poraz'),
(24, 'Fekete -Fehér Kockás Póráz', 3100, 'A Fekete-Fehér Kockás Póráz divatos és stílusos kiegészítő, amely egyesíti a klasszikus fekete és fehér színek eleganciáját a játékos kockás mintával. Ez a póráz nemcsak esztétikus, hanem strapabíró is, így ideális választás a mindennapos kutyasétákhoz.\r\nA póráz hossza 2 méter.', 10, 'Forgalmazó', 'imgs/productPhotos/poraz4.jpg', 'poraz'),
(25, 'Fekete Bőr Póráz', 3000, 'A Fekete Bőr Póráz időtlen eleganciát sugároz, és egyúttal strapabíró és praktikus kiegészítője lehet kutyád sétáinak. Kiváló minőségű fekete bőrből készült, ez a póráz nemcsak stílusos, hanem hosszú távú használatra tervezett.\r\nA póráz hossza 2 méter.', 10, 'Forgalmazó', 'imgs/productPhotos/poraz5.jpg', 'poraz'),
(26, 'Zöld Bőr Póráz', 2800, '', 10, 'Forgalmazó', 'imgs/productPhotos/poraz6.jpg', 'poraz'),
(27, 'Lila Póráz', 2900, '', 10, 'Forgalmazó', 'imgs/productPhotos/poraz7.jpg', 'poraz'),
(28, 'Piros Bőr Póráz', 3300, '', 10, 'Forgalmazó', 'imgs/productPhotos/poraz8.jpg', 'poraz'),
(29, 'Kék Bőr Póráz', 3300, '', 10, 'Forgalmazó', 'imgs/productPhotos/poraz9.jpg', 'poraz'),
(30, 'Rózsaszín Póráz', 2800, '', 10, 'Forgalmazó', 'imgs/productPhotos/poraz10.jpg', 'poraz'),
(31, 'Szürke - Fehér Pöttyös Póráz', 3200, '', 10, 'Forgalmazó', 'imgs/productPhotos/poraz11.jpg', 'poraz'),
(32, 'Virág Mintás Póráz', 3400, 'A Virág Mintás Póráz egy romantikus és kifinomult kiegészítő, amely virágos mintájával színesíti a kutyasétákat. A póráz minőségi anyaga tartós és időjárásálló, így a mindennapi használatnak is könnyedén ellenáll. Az ergonomikus fogantyú kényelmes fogást biztosít, lehetővé téve a könnyű irányítást séták során. Ideális választás minden olyan kutyatulajdonosnak, aki szereti a romantikus és stílusos kiegészítőket. Legyen ez a póráz a kutyád színes és egyedi kiegészítője a következő séták alkalmával!\r\nA póráz hossza 2 méter.', 10, 'Forgalmazó', 'imgs/productPhotos/poraz12.jpg', 'poraz'),
(33, 'Fekete - Narancssárga Hám', 5000, 'A Fekete-Narancssárga Kutyahám egy modern és feltűnő kiegészítő a kutyád számára. Kialakításának köszönhetően nemcsak stílusos, hanem kényelmes is viselni. A fekete és narancssárga színek kombinációja harmonikus és látható megjelenést biztosít, miközben az állítható pántok lehetővé teszik a tökéletes illeszkedést. Az erős csatok és hevederek biztosítják a hám stabil rögzítését, így a kutyád biztonságban és kényelemben élvezheti a sétákat. A reflektív elemek növelik a láthatóságot sötét körülmények között, hozzájárulva a kutyád és a sétálók biztonságához.', 10, 'Forgalmazó', 'imgs/productPhotos/ham1.jpg', 'ham'),
(34, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham2.jpg', 'ham'),
(35, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham3.jpg', 'ham'),
(36, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham4.jpg', 'ham'),
(37, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham5.jpg', 'ham'),
(38, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham6.jpg', 'ham'),
(39, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham7.jpg', 'ham'),
(40, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham8.jpg', 'ham'),
(41, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham8.jpg', 'ham'),
(42, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham9.jpg', 'ham'),
(43, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham10.jpg', 'ham'),
(44, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham11.jpg', 'ham'),
(45, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham12.jpg', 'ham'),
(46, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham13.jpg', 'ham'),
(47, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham14.jpg', 'ham'),
(48, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham15.jpg', 'ham'),
(49, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham16.jpg', 'ham'),
(50, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham17.jpg', 'ham'),
(51, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham18.jpg', 'ham'),
(52, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham19.jpg', 'ham'),
(53, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham20.jpg', 'ham'),
(54, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham21.jpg', 'ham'),
(55, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham22.jpg', 'ham'),
(56, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham23.jpg', 'ham'),
(57, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham24.jpg', 'ham'),
(58, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham25.jpg', 'ham'),
(59, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham26.jpg', 'ham'),
(60, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham27.jpg', 'ham'),
(61, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham28.jpg', 'ham'),
(62, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham29.jpg', 'ham'),
(63, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham30.jpg', 'ham'),
(64, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham31.jpg', 'ham'),
(65, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham32.jpg', 'ham'),
(66, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham33.jpg', 'ham'),
(67, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham34.jpg', 'ham'),
(68, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham35.jpg', 'ham'),
(69, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham36.jpg', 'ham'),
(70, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham37.jpg', 'ham'),
(71, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham38.jpg', 'ham'),
(72, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham39.jpg', 'ham'),
(73, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham40.jpg', 'ham'),
(74, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham41.jpg', 'ham'),
(75, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham42.jpg', 'ham'),
(76, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham43.jpg', 'ham'),
(77, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham44.jpg', 'ham'),
(78, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham45.jpg', 'ham'),
(79, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham46.jpg', 'ham'),
(80, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham47.jpg', 'ham'),
(81, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham48.jpg', 'ham'),
(82, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham49.jpg', 'ham'),
(83, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham50.jpg', 'ham'),
(84, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham51.jpg', 'ham'),
(85, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham52.jpg', 'ham'),
(86, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham53.jpg', 'ham'),
(87, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham54.jpg', 'ham'),
(88, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham55.jpg', 'ham'),
(89, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham56.jpg', 'ham'),
(90, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham57.jpg', 'ham'),
(91, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham58.jpg', 'ham'),
(92, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham59.jpg', 'ham'),
(93, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham60.jpg', 'ham'),
(94, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham61.jpg', 'ham'),
(95, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham62.jpg', 'ham'),
(96, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham63.jpg', 'ham'),
(97, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham64.jpg', 'ham'),
(98, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham65.jpg', 'ham'),
(99, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham66.jpg', 'ham'),
(100, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham67.jpg', 'ham'),
(101, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham68.jpg', 'ham'),
(102, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham69.jpg', 'ham'),
(103, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham70.jpg', 'ham'),
(104, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham71.jpg', 'ham'),
(105, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham72.jpg', 'ham'),
(106, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham73.jpg', 'ham'),
(107, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham74.jpg', 'ham'),
(108, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham75.jpg', 'ham'),
(109, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham76.jpg', 'ham'),
(110, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham77.jpg', 'ham'),
(111, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham78.jpg', 'ham'),
(112, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham79.jpg', 'ham'),
(113, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham80.jpg', 'ham'),
(114, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham81.jpg', 'ham'),
(115, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham82.jpg', 'ham'),
(116, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham83.jpg', 'ham'),
(117, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham84.jpg', 'ham'),
(118, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham85.jpg', 'ham'),
(119, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham86.jpg', 'ham'),
(120, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham87.jpg', 'ham'),
(121, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham88.jpg', 'ham'),
(122, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham89.jpg', 'ham'),
(123, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham90.jpg', 'ham'),
(124, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham91.jpg', 'ham'),
(125, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham92.jpg', 'ham'),
(126, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham93.jpg', 'ham'),
(127, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham94.jpg', 'ham'),
(128, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham95.jpg', 'ham'),
(129, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham96.jpg', 'ham'),
(130, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/ham97.jpg', 'ham'),
(131, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv1.jpg', 'nyakorv'),
(132, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv2.jpg', 'nyakorv'),
(133, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv3.jpg', 'nyakorv'),
(134, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv4.jpg', 'nyakorv'),
(135, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv5.jpg', 'nyakorv'),
(136, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv6.jpg', 'nyakorv'),
(137, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv7.jpg', 'nyakorv'),
(138, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv8.jpg', 'nyakorv'),
(139, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv9.jpg', 'nyakorv'),
(140, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv10.jpg', 'nyakorv'),
(141, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv11.jpg', 'nyakorv'),
(142, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv12.jpg', 'nyakorv'),
(143, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv13.jpg', 'nyakorv'),
(144, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv14.jpg', 'nyakorv'),
(145, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv15.jpg', 'nyakorv'),
(146, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv16.jpg', 'nyakorv'),
(147, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv17.jpg', 'nyakorv'),
(148, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv18.jpg', 'nyakorv'),
(149, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv19.jpg', 'nyakorv'),
(150, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv20.jpg', 'nyakorv'),
(151, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv21.jpg', 'nyakorv'),
(152, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv22.jpg', 'nyakorv'),
(153, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv23.jpg', 'nyakorv'),
(154, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv24.jpg', 'nyakorv'),
(155, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv25.jpg', 'nyakorv'),
(156, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv26.jpg', 'nyakorv'),
(157, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv27.jpg', 'nyakorv'),
(158, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv28.jpg', 'nyakorv'),
(159, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv29.jpg', 'nyakorv'),
(160, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv30.jpg', 'nyakorv'),
(161, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv31.jpg', 'nyakorv'),
(162, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv32.jpg', 'nyakorv'),
(163, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv33.jpg', 'nyakorv'),
(164, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv34.jpg', 'nyakorv'),
(165, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv35.jpg', 'nyakorv'),
(166, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv36.jpg', 'nyakorv'),
(167, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv37.jpg', 'nyakorv'),
(168, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv38.jpg', 'nyakorv'),
(169, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv39.jpg', 'nyakorv'),
(170, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv40.jpg', 'nyakorv'),
(171, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv41.jpg', 'nyakorv'),
(172, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv42.jpg', 'nyakorv'),
(173, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv43.jpg', 'nyakorv'),
(174, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv44.jpg', 'nyakorv'),
(175, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv45.jpg', 'nyakorv'),
(176, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv46.jpg', 'nyakorv'),
(177, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv47.jpg', 'nyakorv'),
(178, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv48.jpg', 'nyakorv'),
(179, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv49.jpg', 'nyakorv'),
(180, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv50.jpg', 'nyakorv'),
(181, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv51.jpg', 'nyakorv'),
(182, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv52.jpg', 'nyakorv'),
(183, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv53.jpg', 'nyakorv'),
(184, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv54.jpg', 'nyakorv'),
(185, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv55.jpg', 'nyakorv'),
(186, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv56.jpg', 'nyakorv'),
(187, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv57.jpg', 'nyakorv'),
(188, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv58.jpg', 'nyakorv'),
(189, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv59.jpg', 'nyakorv'),
(190, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv60.jpg', 'nyakorv'),
(191, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv61.jpg', 'nyakorv'),
(192, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv62.jpg', 'nyakorv'),
(193, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv63.jpg', 'nyakorv'),
(194, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv64.jpg', 'nyakorv'),
(195, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv65.jpg', 'nyakorv'),
(196, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv66.jpg', 'nyakorv'),
(197, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv67.jpg', 'nyakorv'),
(198, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv68.jpg', 'nyakorv'),
(199, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv69.jpg', 'nyakorv'),
(200, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv70.jpg', 'nyakorv'),
(201, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv71.jpg', 'nyakorv'),
(202, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv72.jpg', 'nyakorv'),
(203, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv73.jpg', 'nyakorv'),
(204, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv74.jpg', 'nyakorv'),
(205, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv75.jpg', 'nyakorv'),
(206, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv76.jpg', 'nyakorv'),
(207, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv77.jpg', 'nyakorv'),
(208, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv78.jpg', 'nyakorv'),
(209, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv79.jpg', 'nyakorv'),
(210, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv80.jpg', 'nyakorv'),
(211, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv81.jpg', 'nyakorv'),
(212, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv82.jpg', 'nyakorv'),
(213, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv83.jpg', 'nyakorv'),
(214, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv84.jpg', 'nyakorv'),
(215, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv85.jpg', 'nyakorv'),
(216, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv86.jpg', 'nyakorv'),
(217, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv87.jpg', 'nyakorv'),
(218, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv88.jpg', 'nyakorv'),
(219, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv89.jpg', 'nyakorv'),
(220, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv90.jpg', 'nyakorv'),
(221, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv91.jpg', 'nyakorv'),
(222, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv92.jpg', 'nyakorv'),
(223, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv93.jpg', 'nyakorv'),
(224, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv94.jpg', 'nyakorv'),
(225, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv95.jpg', 'nyakorv'),
(226, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv96.jpg', 'nyakorv'),
(227, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv97.jpg', 'nyakorv'),
(228, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv98.jpg', 'nyakorv'),
(229, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv99.jpg', 'nyakorv'),
(230, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv100.jpg', 'nyakorv'),
(231, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv101.jpg', 'nyakorv'),
(232, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv102.jpg', 'nyakorv'),
(233, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv103.jpg', 'nyakorv'),
(234, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv104.jpg', 'nyakorv'),
(235, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv105.jpg', 'nyakorv'),
(236, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv106.jpg', 'nyakorv'),
(237, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv107.jpg', 'nyakorv'),
(238, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv108.jpg', 'nyakorv'),
(239, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv109.jpg', 'nyakorv'),
(240, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv110.jpg', 'nyakorv'),
(241, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv111.jpg', 'nyakorv'),
(242, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv112.jpg', 'nyakorv'),
(243, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv113.jpg', 'nyakorv'),
(244, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv114.jpg', 'nyakorv'),
(245, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv115.jpg', 'nyakorv'),
(246, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv116.jpg', 'nyakorv'),
(247, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv117.jpg', 'nyakorv'),
(248, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv118.jpg', 'nyakorv'),
(249, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv119.jpg', 'nyakorv'),
(250, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv120.jpg', 'nyakorv'),
(251, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv121.jpg', 'nyakorv'),
(252, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv122.jpg', 'nyakorv'),
(253, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv123.jpg', 'nyakorv'),
(254, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv124.jpg', 'nyakorv'),
(255, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv125.jpg', 'nyakorv'),
(256, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv126.jpg', 'nyakorv'),
(257, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv127.jpg', 'nyakorv'),
(258, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv128.jpg', 'nyakorv'),
(259, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv129.jpg', 'nyakorv'),
(260, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv130.jpg', 'nyakorv'),
(261, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv131.jpg', 'nyakorv'),
(262, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv132.jpg', 'nyakorv'),
(263, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv133.jpg', 'nyakorv'),
(264, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv134.jpg', 'nyakorv'),
(265, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv135.jpg', 'nyakorv'),
(266, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv136.jpg', 'nyakorv'),
(267, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv137.jpg', 'nyakorv'),
(268, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv138.jpg', 'nyakorv'),
(269, '', 0, '', 10, 'Forgalmazó', 'imgs/productPhotos/nyakorv139.jpg', 'nyakorv');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`) VALUES
(1, 'Minta Gergő', 'mintag@gmail.com', '$2y$10$045eVk3ivYs8b'),
(2, 'Minta Fanni', 'mintaf@gmail.com', '$2y$10$oKS.70Y7EIPf1'),
(3, 'Minta Feri', 'mintafe@gmail.com', '$2y$10$s9.Z3jMmmUF.U'),
(4, 'Minta Kata', 'mintak@gmail.com', '$2y$10$.9kZQrvWlNR5f'),
(5, 'Bánfainé Póhl Zsuzsanna', 'hgft@gmail.com', '$2y$10$QL1hh5nxI/Zv9'),
(6, 'Bogos Enikő', 'eniko@gmail.com', '$2y$10$kKxhbxO0FPAwX'),
(7, 'Farkas Fanni', 'ffanni2004@gmail.com', '$2y$10$Y5RcIPf5DH1ZQ');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=270;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
