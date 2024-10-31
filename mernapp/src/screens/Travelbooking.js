import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Travelbooking.css';

export default function Home() {
    const [countryInput, setCountryInput] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedHotel, setSelectedHotel] = useState(null);

    const countries = {
        Maldives: [
            {
                name: "Hotel Paradise",
                location: "Beachside, Maldives",
                rating: "★★★★☆",
                weather: "Sunny, 30°C",
                rooms: [
                    {
                        type: "Standard Room",
                        price: "$200 per night",
                        highestPrice: "$250",
                        lowestPrice: "$180",
                        img:"https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/partner-images/60/15/310234e7499962ce302331604aa0fd01d1079439c8c9dd1cf9fe6e481088.jpeg"
                    },
                    {
                        type: "Deluxe Room",
                        price: "$300 per night",
                        highestPrice: "$350",
                        lowestPrice: "$280",
                        img: "https://www.financialexpress.com/wp-content/uploads/2018/11/underwater-restuarant.jpg"
                    }
                ],
                img: "https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2021/04/SONEVA-JANI-MALDIVES.jpeg?fit=970%2C545&amp;ssl=1"
            }
        ],
        UnitedStates: [
            {
                name: "Hotel Luxury",
                location: "Downtown, New York",
                rating: "★★★★★",
                weather: "Cloudy, 15°C",
                rooms: [
                    {
                        type: "Suite",
                        price: "$500 per night",
                        highestPrice: "$600",
                        lowestPrice: "$450",
                        img: "https://do84cgvgcm805.cloudfront.net/article/490/377/e4975ec1eaa99562583a300c6d27671396f17994892e756132e7c8ec58bb2760.jpg"
                    },
                    {
                        type: "Executive Room",
                        price: "$400 per night",
                        highestPrice: "$450",
                        lowestPrice: "$380",
                        img: "https://images.trvl-media.com/lodging/1000000/20000/15300/15237/b7baf5e9.jpg?impolicy=fcrop&amp;w=357&amp;h=201&amp;p=1&amp;q=medium"
                    }
                ],
                img: "https://media.cnn.com/api/v1/images/stellar/prod/160726150122-us-beautiful-hotels-17-bellagio-1.jpg?q=w_1900,h_1096,x_0,y_0,c_fill"
            }
        ],
        India: [
            {
                name: "Taj Mahal Hotel",
                location: "Mumbai, India",
                rating: "★★★★★",
                weather: "Sunny, 28°C",
                rooms: [
                    {
                        type: "Luxury Room",
                        price: "$350 per night",
                        highestPrice: "$400",
                        lowestPrice: "$300",
                        img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/305159686.jpg?k=ae35948fc9b37da38b9f9662d93c0623f6525cd659852af15cedaaa72f543619&amp;o=&amp;hp=1"
                    },
                    {
                        type: "Presidential Suite",
                        price: "$800 per night",
                        highestPrice: "$900",
                        lowestPrice: "$750",
                        img:"https://media-cdn.tripadvisor.com/media/photo-s/05/75/60/f1/the-seagull-suite.jpg"
                    }
                ],
                img:"https://upload.wikimedia.org/wikipedia/commons/7/73/Taj_Mahal_Palace_Hotel.jpg"
            }
        ],
        France: [
            {
                name: "Parisian Elegance",
                location: "Paris, France",
                rating: "★★★★☆",
                weather: "Rainy, 12°C",
                rooms: [
                    {
                        type: "Standard Room",
                        price: "$220 per night",
                        highestPrice: "$250",
                        lowestPrice: "$200",
                        img: "https://media.privateupgrades.com/_data/default-room_image/8/43098/parlc-queen-bed-2597-hor-clsc_400x400_auto.jpg"
                    }
                ],
                img: "https://digital.ihg.com/is/image/ihg/voco-clichy-9097094804-4x3"
            }
        ],
        Japan: [
            {
                name: "Tokyo Tower Hotel",
                location: "Tokyo, Japan",
                rating: "★★★★★",
                weather: "Sunny, 25°C",
                rooms: [
                    {
                        type: "Standard Room",
                        price: "$180 per night",
                        highestPrice: "$220",
                        lowestPrice: "$160",
                        img: "https://d26ityues3jcbs.cloudfront.net/wp-content/uploads/2024/03/26172334/2-Janu_BrandHomepage_JanuTokyo-1.jpg"
                    }
                ],
                img: "https://content.r9cdn.net/himg/76/0c/c6/leonardo-319781-182234565-943932.jpg"
            }
        ],
        Brazil: [
            {
                name: "Rio Beach Resort",
                location: "Rio de Janeiro, Brazil",
                rating: "★★★★☆",
                weather: "Sunny, 29°C",
                rooms: [
                    {
                        type: "Ocean View Room",
                        price: "$300 per night",
                        highestPrice: "$350",
                        lowestPrice: "$250",
                        img: "https://cf.bstatic.com/static/img/theme-index/bg_resorts_new/6e8294d75f648eab2cd2818f0a40854367e584a5.jpg"
                    }
                ],
                img: "https://cdn.budgetyourtrip.com/images/photos/headerphotos/large/brazil_forteleza.jpg"
            }
        ],
        Australia: [
            {
                name: "Sydney Harbour Hotel",
                location: "Sydney, Australia",
                rating: "★★★★☆",
                weather: "Sunny, 22°C",
                rooms: [
                    {
                        type: "City View Room",
                        price: "$220 per night",
                        highestPrice: "$250",
                        lowestPrice: "$200",
                        img:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/6c/1c/18/suite.jpg?w=1200&amp;h=-1&amp;s=1"
                    }
                ],
                img: "https://www.kayak.co.in/rimg/dimg/2e/4d/e27e04f5-city-13998-166a6398190.jpg?crop=true&amp;width=400&amp;height=300"
            }
        ],
        Canada: [
            {
                name: "Maple Leaf Inn",
                location: "Toronto, Canada",
                rating: "★★★★☆",
                weather: "Cloudy, 10°C",
                rooms: [
                    {
                        type: "Standard Room",
                        price: "$150 per night",
                        highestPrice: "$180",
                        lowestPrice: "$120",
                        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/b7/ed/3b/master-bedroom-royal.jpg?w=1200&amp;h=-1&amp;s=1"
                    }
                ],
                img: "https://www.kayak.co.in/rimg/dimg/06/43/7c7e5fe8-city-6668-16c3e1fd7c8.jpg?crop=true&amp;width=400&amp;height=300"
            }
        ],
        Italy: [
            {
                name: "Venice Grand Hotel",
                location: "Venice, Italy",
                rating: "★★★★★",
                weather: "Sunny, 24°C",
                rooms: [
                    {
                        type: "Romantic Room",
                        price: "$400 per night",
                        highestPrice: "$450",
                        lowestPrice: "$350",
                        img: "https://www.telegraph.co.uk/content/dam/Travel/hotels/articles/italy-50-best/four-seasons-florence.jpg?imwidth=350"
                    }
                ],
                img: "https://media.architecturaldigest.com/photos/645ceac94a37f558cb8c3297/1:1/w_1400,h_1400,c_limit/luxVCEGLst.242647.jpg"
            }
        ],
        Germany: [
            {
                name: "Berlin Central Hotel",
                location: "Berlin, Germany",
                rating: "★★★★☆",
                weather: "Rainy, 8°C",
                rooms: [
                    {
                        type: "Business Room",
                        price: "$180 per night",
                        highestPrice: "$200",
                        lowestPrice: "$160",
                        img:"https://cdn.luxuryhotel.world/file/hotcdn/hotel/cover-small/73143_1525728112.jpg"
                    }
                ],
                img: "https://www.kayak.co.in/rimg/dimg/4d/27/32380e7d-city-32131-17763eca165.jpg?crop=true&amp;width=400&amp;height=300"
            }
        ],
        SouthAfrica: [
            {
                name: "Cape Town Resort",
                location: "Cape Town, South Africa",
                rating: "★★★★★",
                weather: "Sunny, 27°C",
                rooms: [
                    {
                        type: "Luxury Suite",
                        price: "$350 per night",
                        highestPrice: "$400",
                        lowestPrice: "$300",
                        img: "room14.jpg"
                    }
                ],
                img: "hotel11.jpg"
            }
        ],
        Spain: [
            {
                name: "Barcelona Beach Hotel",
                location: "Barcelona, Spain",
                rating: "★★★★☆",
                weather: "Sunny, 29°C",
                rooms: [
                    {
                        type: "Oceanfront Room",
                        price: "$250 per night",
                        highestPrice: "$300",
                        lowestPrice: "$200",
                        img: "room15.jpg"
                    }
                ],
                img: "hotel12.jpg"
            }
        ],
        // Add more countries and hotels as needed
        // ... up to 151 countries
        Hyderabad: [
            {
                name: "Hyderabad Heritage Hotel",
                location: "Hyderabad, India",
                rating: "★★★★☆",
                weather: "Sunny, 30°C",
                rooms: [
                    {
                        type: "Standard Room",
                        price: "1500 per night",
                        highestPrice: "1800",
                        lowestPrice: "1300",
                        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/b9/d0/cheap-hotels.jpg?w=1200&amp;h=-1&amp;s=1"
                    },
                    {
                        type: "Deluxe Room",
                        price: "2000 per night",
                        highestPrice: "2200",
                        lowestPrice: "1800",
                        img: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/201804031804379537-3703456-0a49deaa603711e9a96a0242ac110002.jpg"
                    },
                    {
                        type: "Suite Room",
                        price: "3000 per night",
                        highestPrice: "3500",
                        lowestPrice: "2800",
                        img: "https://www.itchotels.com/content/dam/itchotels/in/umbrella/itc/hotels/itckohenur-hyderabad/images/overview/headmast-desktop/towers.png"
                    }
                ],
                img: "https://www.itchotels.com/content/dam/itchotels/in/umbrella/itc/hotels/itckohenur-hyderabad/images/overview/headmast-desktop/facade-aerial.png"
            }
        ],
        Chennai: [
            {
                name: "Chennai Comfort Inn",
                location: "Chennai, India",
                rating: "★★★★",
                weather: "Sunny, 32°C",
                rooms: [
                    {
                        type: "Standard Room",
                        price: "1500 per night",
                        highestPrice: "1700",
                        lowestPrice: "1300",
                        img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/539960114.jpg?k=ef64a964109f3fb539791936503182d84da21959e26cb18c95a83a1e38c8f534&amp;o=&amp;hp=1"
                    },
                    {
                        type: "Executive Room",
                        price: "2500 per night",
                        highestPrice: "2700",
                        lowestPrice: "2300",
                        img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/522909731.jpg?k=d62fb92afb03fa18142690c714b2e995462f7dfe9f704c6397a186b8127242c6&amp;o=&amp;hp=1"
                    },
                    {
                        type: "Luxury Suite",
                        price: "4000 per night",
                        highestPrice: "4500",
                        lowestPrice: "3800",
                        img: "https://cf.bstatic.com/xdata/images/hotel/max200/522909720.jpg?k=a2c196d19e76ea41eb78e3207cb1ef1403ce776d6e49271cf3272e8012c2ead0&amp;o=&amp;hp=1"
                    }
                ],
                img: "https://c8.alamy.com/comp/EGW3CJ/outdoor-terrace-swimming-pool-at-the-luxurious-5-star-leela-palace-EGW3CJ.jpg"
            }
        ],
        Mumbai: [
            {
                name: "Mumbai Grand Hotel",
                location: "Mumbai, India",
                rating: "★★★★★",
                weather: "Rainy, 28°C",
                rooms: [
                    {
                        type: "Luxury Room",
                        price: "3500 per night",
                        highestPrice: "4000",
                        lowestPrice: "3000",
                        img:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/461630725.jpg?k=8755461b6f4eeeb3875a41aaeca7fd2bb1e2eac5e355e7596fff002610fdf069&amp;o=&amp;hp=1"
                    },
                    {
                        type: "Presidential Suite",
                        price: "8000 per night",
                        highestPrice: "9000",
                        lowestPrice: "7500",
                        img: "https://www.itchotels.com/content/dam/itchotels/in/umbrella/itc/hotels/itcmaratha-mumbai/images/overview-landing-page/headmast/desktop/shivaji-presidential-suite.png"
                    },
                    {
                        type: "Family Room",
                        price: "4000 per night",
                        highestPrice: "4500",
                        lowestPrice: "3800",
                        img:"https://pix10.agoda.net/hotelImages/41037428/-1/b1044eb247cbbba4895b62e51782f021.jpg?ce=0&amp;s=702x392"
                    }
                ],
                img: "https://media.gettyimages.com/id/493734514/photo/taj-mahal-palace-hotel-in-mumbai-india.jpg?s=612x612&amp;w=gi&amp;k=20&amp;c=NRfRCsWXZqfunQ6amsitPpIjQwM_xdGo0dMFqmov9xM="
            }
        ],
        Delhi: [
            {
                name: "Delhi Royal Palace",
                location: "Delhi, India",
                rating: "★★★★★",
                weather: "Sunny, 25°C",
                rooms: [
                    {
                        type: "Suite Room",
                        price: "5000 per night",
                        highestPrice: "5500",
                        lowestPrice: "4800",
                        img:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/550559664.jpg?k=2b872efe6a4cca553b22ba457cd37e175cfb62617b26849715d45619de14dc40&amp;o=&amp;hp=1"
                    },
                    {
                        type: "Business Room",
                        price: "3000 per night",
                        highestPrice: "3500",
                        lowestPrice: "2800",
                        img:"https://images.oyoroomscdn.com/uploads/hotel_image/2600/small/ab0565e4d9a68c6b.jpg"
                    },
                    {
                        type: "Standard Room",
                        price: "2000 per night",
                        highestPrice: "2200",
                        lowestPrice: "1800",
                        img:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/331797608.jpg?k=358e3fe8ae7ff684f46e26b0c65e14da3116bc5d1c69a10a8a4dedfa0366e994&amp;o=&amp;hp=1"
                    }
                ],
                img:"https://www.itchotels.com/content/dam/itchotels/in/umbrella/images/brands-desktop/itc-maurya.png"
            }
        ],
        Kolkata: [
            {
                name: "Kolkata Classic Hotel",
                location: "Kolkata, India",
                rating: "★★★★☆",
                weather: "Cloudy, 26°C",
                rooms: [
                    {
                        type: "Business Room",
                        price: "2200 per night",
                        highestPrice: "2400",
                        lowestPrice: "2000",
                        img:"https://www.itchotels.com/content/dam/itchotels/in/umbrella/itc/hotels/itcroyalbengal-kolkata/images/overview-landing-page/headmast/desktop/itc-one-sitting-room.jpg"
                    },
                    {
                        type: "Deluxe Room",
                        price: "2500 per night",
                        highestPrice: "2700",
                        lowestPrice: "2300",
                        img:"https://www.momondo.in/himg/ee/17/4a/leonardo-1292297-2_-_Premium_room-premium_suite_sleeping_room_alt_O-759937.jpg"
                    },
                    {
                        type: "Suite Room",
                        price: "3500 per night",
                        highestPrice: "4000",
                        lowestPrice: "3200",
                        img:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/27150803.jpg?k=95ce51f71f77ab0cd31a60fbdec22e3f2fda7141e4bea4dd9efe5595df565e0d&amp;o=&amp;hp=1"
                    }
                ],
                img:"https://content.skyscnr.com/available/1773146993/1773146993_WxH.jpg"
            }
        ],
        Bengaluru: [
            {
                name: "Bengaluru Bliss Hotel",
                location: "Bengaluru, India",
                rating: "★★★★",
                weather: "Sunny, 27°C",
                rooms: [
                    {
                        type: "Standard Room",
                        price: "1800 per night",
                        highestPrice: "2000",
                        lowestPrice: "1600",
                        img:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/497787661.jpg?k=58bff7b48e28c244b09ff4c20b96b1634efdab6d6734148a370e43214baa061b&amp;o=&amp;hp=1"
                    },
                    {
                        type: "Executive Room",
                        price: "2500 per night",
                        highestPrice: "2800",
                        lowestPrice: "2300",
                        img:"https://cdn.sanity.io/images/ocl5w36p/production/36826de7385066979f89fb9643b6c17fe194459d-1281x1760.jpg?w=480&amp;fm=webp&amp;dpr=2"
                    },
                    {
                        type: "Luxury Suite",
                        price: "4000 per night",
                        highestPrice: "4500",
                        lowestPrice: "3800",
                        img:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/344764297.jpg?k=074a0878a6ec61ccbbe4b845871ea77ad7cca0bb89e6fc0f3fffff9e76de4ee5&amp;o=&amp;hp=1"
                    }
                ],
                img:"https://travel-blog.happyeasygo.com/wp-content/uploads/2021/11/The-Leela-Palace.jpg "
            }
        ],
        Raipur: [
            {
                name: "Raipur Luxury Stay",
                location: "Raipur, India",
                rating: "★★★☆☆",
                weather: "Sunny, 30°C",
                rooms: [
                    {
                        type: "Standard Room",
                        price: "1300 per night",
                        highestPrice: "1500",
                        lowestPrice: "1200",
                        img:"https://www.themayurahotels.com/newest-img/rooms/suite_room/Suite%20room3_DSC4655.jpg"
                    },
                    {
                        type: "Deluxe Room",
                        price: "2000 per night",
                        highestPrice: "2200",
                        lowestPrice: "1800",
                        img:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/270058077.jpg?k=1ea3da56cba31b23bcd329fcec1b721676fad88cfc41ddac769980677ae3554d&amp;o=&amp;hp=1"
                    },
                    {
                        type: "Family Room",
                        price: "2500 per night",
                        highestPrice: "2800",
                        lowestPrice: "2300",
                        img: "https://hotel-babylon-inn-raipur.booked.net/data/Photos/OriginalPhoto/6836/683638/683638884/Hotel-Babylon-Inn-Raipur-Exterior.JPEG"
                    }
                ],
                img:"https://res.cloudinary.com/simplotel/image/upload/x_0,y_141,w_1500,h_843,c_crop,q_80,fl_progressive/w_900,h_506,f_auto,c_fit/singhania-sarovar-portico-raipur/Exterior_Singhania_Sarovar_Portico_Raipur.jpg_idfn0j"
            }
        ],
        Panaji: [
            {
                name: "Panaji Paradise Resort",
                location: "Panaji, Goa",
                rating: "★★★★☆",
                weather: "Sunny, 29°C",
                rooms: [
                    {
                        type: "Ocean View Room",
                        price: "2200 per night",
                        highestPrice: "2500",
                        lowestPrice: "2000",
                        img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/603208166.jpg?k=07715df961e5221d27e66511848a32e70c20309791144a5a17ae1ec5e9eef24b&amp;o=&amp;hp=1"
                    },
                    {
                        type: "Deluxe Room",
                        price: "2500 per night",
                        highestPrice: "2800",
                        lowestPrice: "2300",
                        img:"https://www.vivantahotels.com/content/dam/vivanta/hotels/VBT-Panaji/images/Retreat/PictureA.jpg"
                    },
                    {
                        type: "Suite Room",
                        price: "3500 per night",
                        highestPrice: "4000",
                        lowestPrice: "3200",
                        img: "https://www.momondo.in/rimg/himg/bd/f4/13/leonardo-56605-153242771-105919.jpg?width=968&amp;height=607&amp;crop=true"
                    }
                ],
                img:"https://api.blessingsonthenet.com/uploads/hotels/1299e911d80528f2cc6488780880023b-1691213959143-Fortune%20Miramar,%20Goa.jpg"
            }
        ],
        Bhopal: [
            {
                name: "Bhopal Heritage Hotel",
                location: "Bhopal, India",
                rating: "★★★★",
                weather: "Cloudy, 24°C",
                rooms: [
                    {
                        type: "Standard Room",
                        price: "1400 per night",
                        highestPrice: "1600",
                        lowestPrice: "1200",
                        img:"https://www.holidify.com/images/cmsuploads/compressed/232239351_20221125034908.jpg"
                    },
                    {
                        type: "Deluxe Room",
                        price: "1800 per night",
                        highestPrice: "2000",
                        lowestPrice: "1600",
                        img: "https://res.cloudinary.com/simplotel/image/upload/w_5000,h_3333/x_0,y_260,w_5000,h_2812,r_0,c_crop,q_80,fl_progressive/w_900,f_auto,c_fit/hotel-meghdoot-bhopal/Meghdoot_Hotel_10-09-2023_Studio_New_Folder_001_tfinfi"
                    },
                    {
                        type: "Executive Room",
                        price: "2200 per night",
                        highestPrice: "2400",
                        lowestPrice: "2000",
                        img:"https://www.treehousehideaway.com/images/thh-internal.jpg"
                    }
                ],
                img:"https://cdn.sanity.io/images/ocl5w36p/production/b1fed784dc6dc98614dff6360fccec970a9534cd-414x310.jpg?w=480&amp;fm=webp&amp;dpr=2"
            }
        ],
        Visakhapatnam: [
            {
                name: "Visakhapatnam Bay Resort",
                location: "Visakhapatnam, India",
                rating: "★★★★☆",
                weather: "Sunny, 28°C",
                rooms: [
                    {
                        type: "Ocean View Room",
                        price: "2300 per night",
                        highestPrice: "2500",
                        lowestPrice: "2100",
                        img:"https://www.ambicaseagreen.com/header/2a.jpg"
                    },
                    {
                        type: "Standard Room",
                        price: "1600 per night",
                        highestPrice: "1800",
                        lowestPrice: "1400",
                        img:"https://www.theparkhotels.com/images/site-specific/visakhapatnam/rooms/luxury_rooms/luxury-01.jpg"
                    },
                    {
                        type: "Luxury Suite",
                        price: "3500 per night",
                        highestPrice: "4000",
                        lowestPrice: "3200",
                        img:"https://imgcld.yatra.com/ytimages/image/upload/t_seo_Hotel_w_930_h_550_c_fill_g_auto_q_40_f_jpg/v1503385214/Hotel/Visakhapatnam/00000651/Premium_Room_wdKzRy.jpg"
                    }
                ],
                img: "https://cache.marriott.com/content/dam/marriott-digital/fi/apec/hws/v/vtzfi/en_us/photo/unlimited/assets/vtzfi-exterior-0021.jpg"
            }
        ],
        Bhubaneswar: [
            {
                name: "Bhubaneswar Rand Hotel",
                location: "Bhubaneswar, India",
                rating: "★★★★",
                weather: "Sunny, 27°C",
                rooms: [
                    {
                        type: "Standard Room",
                        price: "1500 per night",
                        highestPrice: "1700",
                        lowestPrice: "1300",
                        img:"https://images.trvl-media.com/lodging/2000000/1900000/1900000/1899945/1fb4ec7d.jpg?impolicy=fcrop&amp;w=1200&amp;h=800&amp;p=1&amp;q=medium"
                    },
                    {
                        type: "Deluxe Room",
                        price: "2200 per night",
                        highestPrice: "2400",
                        lowestPrice: "2000",
                        img:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/63/d3/20/luxury-suit.jpg?w=700&amp;h=-1&amp;s=1"
                    },
                    {
                        type: "Suite Room",
                        price: "3000 per night",
                        highestPrice: "3500",
                        lowestPrice: "2800",
                        img:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/450679631.jpg?k=5495e459c47bf24b4bc81d7330e5dd9086e25fb3758232d07650b0abc33d997c&amp;o=&amp;hp=1"
                    }
                ],
                img:"https://www.tridenthotels.com/-/media/trident-hotel/hotel-in-bhubneshwar/Bhubneswar-Overview/Banner/banner_1920x1080-1.jpg"
            }
        ],
    };
    
    const handleSearch = () => {
        const country = countries[countryInput];
        if (country) {
            setSelectedCountry({ name: countryInput, hotels: country });
            setSelectedHotel(null); // Reset selected hotel when a country is selected
        } else {
            alert("No hotels found for this country. Please try another.");
            setCountryInput('');
        }
    };

    const handleRoomClick = (roomType) => {
        const emailBody = `I would like to inquire about the ${roomType}. Please send me more information.`;
        const emailSubject = `Inquiry about ${roomType}`;
        window.location.href = `mailto:example@example.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    };

    return (
        <div>
            <Navbar />
            <header>
                <h1>Hotel Booking</h1>
            </header>
            <main>
                <input 
                    type="text" 
                    value={countryInput} 
                    onChange={(e) => setCountryInput(e.target.value)} 
                    placeholder="Enter City Name" 
                />
                <button onClick={handleSearch}>Search</button>

                {selectedCountry ? (
                    <div>
                        <h2>{selectedCountry.name} Hotels</h2>
                        <div className="hotel-list">
                            {selectedCountry.hotels.map(hotel => (
                                <div className="hotel" key={hotel.name} onClick={() => setSelectedHotel(hotel)}>
                                    <img src={hotel.img} alt={hotel.name} />
                                    <h3>{hotel.name}</h3>
                                    <p>Rating: {hotel.rating}</p>
                                </div>
                            ))}
                        </div>
                        {selectedHotel && (
                            <div className="details">
                                <h2>{selectedHotel.name}</h2>
                                <p>Location: {selectedHotel.location}</p>
                                <p>Rating: {selectedHotel.rating}</p>
                                <p>Weather Condition: {selectedHotel.weather}</p>
                                <h3>Rooms:</h3>
                                <div className="room-list">
                                    {selectedHotel.rooms.map(room => (
                                        <div className="room" key={room.type} onClick={() => handleRoomClick(room.type)}>
                                            <h4>{room.type}</h4>
                                            <img src={room.img} alt={room.type} />
                                            <p>Price: {room.price}</p>
                                            <p>Highest Price: {room.highestPrice}</p>
                                            <p>Lowest Price: {room.lowestPrice}</p>
                                            <button onClick={() => handleRoomClick(room.type)}>Book Now</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <button onClick={() => setSelectedCountry(null)}>Back to Search</button>
                    </div>
                ) : (
                    <div>Please enter a city to see available hotels.</div>
                )}
            </main>
            <Footer />
        </div>
    );
}
