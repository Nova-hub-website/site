const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

const products = [
    {
      "ImageURL": "https://imgur.com/FHggRBw",
      "ItemName": "Apple Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/dqC1uBJ",
      "ItemName": "Amazon Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/ogCnN4x",
      "ItemName": "Xbox Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/uUalsh6",
      "ItemName": "Playstation Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/IxSpNf7",
      "ItemName": "Nintendo Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/FXjaPLr",
      "ItemName": "Minecraft Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/Gk3adC7",
      "ItemName": "Play Store Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/JT3qpvh",
      "ItemName": "Steam Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/C6X6swh",
      "ItemName": "Twitch Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/QXmfhGT",
      "ItemName": "Spotify Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/VfD2qaN",
      "ItemName": "Uber Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/qynsSO3",
      "ItemName": "Air BnB Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/xYeK8fx",
      "ItemName": "Puma Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/WZbSOiQ",
      "ItemName": "Adidas Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/tRqwAji",
      "ItemName": "Ebay Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/WBljidO",
      "ItemName": "Tmall Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/jZeQczK",
      "ItemName": "Walmart Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/d7xEcRk",
      "ItemName": "Nike Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/wCYvWjY",
      "ItemName": "Binance Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/bS1YiDT",
      "ItemName": "TNG realod pin Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/iuHbE5c",
      "ItemName": "Seagm Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/HPti3mW",
      "ItemName": "Razer Gold Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/TUQcPfC",
      "ItemName": "QQ coin Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/xFfg8Ra",
      "ItemName": "Bigo live Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/XUyAWva",
      "ItemName": "PUBG Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/WSZHRB1",
      "ItemName": "IMVU Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/ZrlFtIN",
      "ItemName": "Paypal Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/Jpvj1dc",
      "ItemName": "Free Fire Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/rRY17RA",
      "ItemName": "Ea Sports Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/djsYiG2",
      "ItemName": "Riot Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/W9QZHyl",
      "ItemName": "Diablo Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/UJTmZYI",
      "ItemName": "Valorant Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/jA27AHy",
      "ItemName": "Eset Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/MYQXLsb",
      "ItemName": "Battle.net Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/L1nIIQm",
      "ItemName": "Paysafe Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/5o17n60",
      "ItemName": "Apex legends Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/e03bffl",
      "ItemName": "Fortnite Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/M3FYGii",
      "ItemName": "Nexon Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/RHH4DJb",
      "ItemName": "Spiderman Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/IcBRLm9",
      "ItemName": "Malice Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/iWgrz2R",
      "ItemName": "Starcraft Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/2MoSo0g",
      "ItemName": "Atomic heart Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/tnakRqT",
      "ItemName": "Fifa Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/0CkeSjQ",
      "ItemName": "Cyberpunk Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/ziR38To",
      "ItemName": "Forza Horizon Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/ZbeCNdR",
      "ItemName": "Sims Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/ak4eO6W",
      "ItemName": "Residents evil Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/FWCks6m",
      "ItemName": "Hitpoints Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/bSVnVQY",
      "ItemName": "Gash Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/XrsvKmz",
      "ItemName": "Gta Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/To85iHS",
      "ItemName": "Roblox Gift Card",
      "ItemCategory": "Gift Cards",
      "Price": "160-1600",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/PSmHrSj",
      "ItemName": "Snap Chat+ 1 month",
      "ItemCategory": "Subscriptions",
      "Price": "30",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/XoCWZHS",
      "ItemName": "Snap Chat+ 1 year",
      "ItemCategory": "Subscriptions",
      "Price": "100",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/ryP8rzO",
      "ItemName": "Telegram 1 month",
      "ItemCategory": "Subscriptions",
      "Price": "",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/E2c2zDP",
      "ItemName": "Telegram 1 year",
      "ItemCategory": "Subscriptions",
      "Price": "",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/MGDqV0N",
      "ItemName": "Hulu 1 month",
      "ItemCategory": "Subscriptions",
      "Price": "",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/RJuk6kF",
      "ItemName": "Netflix with ads",
      "ItemCategory": "Subscriptions",
      "Price": "10",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/dTVwNPm",
      "ItemName": "Netflix Standard",
      "ItemCategory": "Subscriptions",
      "Price": "45",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/V8U88cm",
      "ItemName": "Netflix Premium",
      "ItemCategory": "Subscriptions",
      "Price": "75",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/ZECTFWn",
      "ItemName": "Skype",
      "ItemCategory": "Subscriptions",
      "Price": "",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/mw4V68I",
      "ItemName": "Nord Vpn",
      "ItemCategory": "Subscriptions",
      "Price": "",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/yZlaTlL",
      "ItemName": "Disney Plus",
      "ItemCategory": "Subscriptions",
      "Price": "",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/n4Bg5Sp",
      "ItemName": "Amazon Prime",
      "ItemCategory": "Subscriptions",
      "Price": "",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/pO70LYx",
      "ItemName": "Mcafee antivirus",
      "ItemCategory": "Subscriptions",
      "Price": "",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/V1GUQbP",
      "ItemName": "Terabox",
      "ItemCategory": "Subscriptions",
      "Price": "",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/wbg3jQx",
      "ItemName": "Surf shark",
      "ItemCategory": "Subscriptions",
      "Price": "",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/vEyg633",
      "ItemName": "Call Of Duty Mobile",
      "ItemCategory": "Subscriptions",
      "Price": "",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/lW4ytYc",
      "ItemName": "Five Carrd",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "100",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/wZMc5v2",
      "ItemName": "ETISALAT",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/lW4ytYc",
      "ItemName": "Hello Card",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/FirwsnB",
      "ItemName": "Airalo",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/lW4ytYc",
      "ItemName": "02 Vodafone",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/ThRoUVk",
      "ItemName": "Lyca",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/OiG7idA",
      "ItemName": "Smart buddy",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/Lnw1IHY",
      "ItemName": "Redone",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/cZ9ERI1",
      "ItemName": "Zain",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/2uf31sg",
      "ItemName": "T mobile",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/AdqMEt5",
      "ItemName": "Unifi Mobile",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/msRaIWf",
      "ItemName": "Lebara",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/1NBlIY8",
      "ItemName": "Tune talk",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/lW4ytYc",
      "ItemName": "1-2 call",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/KnasUAN",
      "ItemName": "mOBIFONE",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/un0pDIA",
      "ItemName": "Viettel",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/5ZHalyr",
      "ItemName": "U mobile",
      "ItemCategory": "Telco Pre-paid cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/6QR2liA",
      "ItemName": "Netherlands Physical Sim",
      "ItemCategory": "Foreign Sim Cards",
      "Price": "520",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/W3iZ4oi",
      "ItemName": "USA activated no airtimePhysical Sim",
      "ItemCategory": "Foreign Sim Cards",
      "Price": "700",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/NwvZfHK",
      "ItemName": "USA unactivated",
      "ItemCategory": "Foreign Sim Cards",
      "Price": "250",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/lR3Uyf5",
      "ItemName": "Switzerland Physical Sim",
      "ItemCategory": "Foreign Sim Cards",
      "Price": "350",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/R7D1URT",
      "ItemName": "Poland Physical Sim",
      "ItemCategory": "Foreign Sim Cards",
      "Price": "350",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/ddmFzWG",
      "ItemName": "Ukraine Physical Sim",
      "ItemCategory": "Foreign Sim Cards",
      "Price": "350",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/undefined",
      "ItemName": "France Physical Sim",
      "ItemCategory": "Foreign Sim Cards",
      "Price": "350",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/jNoLAYO",
      "ItemName": "Sweden Physical Sim",
      "ItemCategory": "Foreign Sim Cards",
      "Price": "350",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/JtoFh4Q",
      "ItemName": "Morocco Physical Sim",
      "ItemCategory": "Foreign Sim Cards",
      "Price": "500",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/HLCHxLn",
      "ItemName": "Canada Physical Sim",
      "ItemCategory": "Foreign Sim Cards",
      "Price": "350",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/0BINAoV",
      "ItemName": "UK Physical Sim",
      "ItemCategory": "Foreign Sim Cards",
      "Price": "450",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/92YroQd",
      "ItemName": "German Physical Sim",
      "ItemCategory": "Foreign Sim Cards",
      "Price": "1150",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/91Uc88h",
      "ItemName": "Lithuania Physical Sim",
      "ItemCategory": "Foreign Sim Cards",
      "Price": "350",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/FUKSyM7",
      "ItemName": "Spain Physical Sim",
      "ItemCategory": "Foreign Sim Cards",
      "Price": "850",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/cfSNA9G",
      "ItemName": "Australia Physical Sim",
      "ItemCategory": "Foreign Sim Cards",
      "Price": "",
      "Stock": "30",
      "Status": "Temporarily unavailable",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/oWMdhUN",
      "ItemName": "Paypal Neosurf",
      "ItemCategory": "Payment Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/Mb43d7Q",
      "ItemName": "Skrill",
      "ItemCategory": "Payment Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/kETVBdd",
      "ItemName": "Mifinity",
      "ItemCategory": "Payment Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/o382qw1",
      "ItemName": "Payeer",
      "ItemCategory": "Payment Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/fPx9JKT",
      "ItemName": "Webmoney",
      "ItemCategory": "Payment Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/hBm2qhY",
      "ItemName": "AdvCash",
      "ItemCategory": "Payment Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/oELyO7N",
      "ItemName": "Payz",
      "ItemCategory": "Payment Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/kbFUQd7",
      "ItemName": "Paysera",
      "ItemCategory": "Payment Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/zZk32zL",
      "ItemName": "Venmo",
      "ItemCategory": "Payment Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/hWwKjez",
      "ItemName": "Fasapay",
      "ItemCategory": "Payment Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/mpNRbMZ",
      "ItemName": "Revolut",
      "ItemCategory": "Payment Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/1dUO5OQ",
      "ItemName": "Toneo first",
      "ItemCategory": "Payment Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/zRNcrgZ",
      "ItemName": "Vanilla visa Card ",
      "ItemCategory": "Virtual Credit Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/eJDX0fm",
      "ItemName": "Mastercard",
      "ItemCategory": "Virtual Credit Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/Ve6Xz8d",
      "ItemName": "American Express",
      "ItemCategory": "Virtual Credit Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/8Uu0yOn",
      "ItemName": "Visa card",
      "ItemCategory": "Virtual Credit Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/lW4ytYc",
      "ItemName": "Pds Mastercard",
      "ItemCategory": "Virtual Credit Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/YZ0Eq3s",
      "ItemName": "Mint prepaid card",
      "ItemCategory": "Virtual Credit Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    },
    {
      "ImageURL": "https://imgur.com/cpoFggI",
      "ItemName": "Toneo first Mastercard",
      "ItemCategory": "Virtual Credit Cards",
      "Price": "",
      "Stock": "30",
      "Status": "In stock",
      "Notes": "",
      "InStock": "TRUE"
    }
  ]

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const formatted = products.map(p => ({
      ImageURL: p.ImageURL,
      ItemName: p.ItemName,
      ItemCategory: p.ItemCategory.toLowerCase(),
      Price: parseFloat(p.Price.split("-")[0]) || 0, // takes min price
      Stock: parseInt(p.Stock, 10) || 0,
      Status: p.Status.toLowerCase() === "in stock" ? "available" : "unavailable",
      Notes: p.Notes || "",
      InStock: p.InStock.toLowerCase() === "true"
    }));

    const res = await Product.insertMany(formatted);
    console.log(`✅ Inserted ${res.length} products`);

    process.exit();
  } catch (err) {
    console.error("❌ Failed:", err.message);
    process.exit(1);
  }
};

run();