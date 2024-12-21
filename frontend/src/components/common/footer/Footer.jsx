import React from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { TfiHelpAlt } from "react-icons/tfi";

const footerSections = [
    {
        title: "Gamers Hub",
        items: ["About us", "Careers", "Warranty policy", "Shipping policy", "Privacy policy", "Terms of use", "Payment Methods"],
    },
    {
        title: "Customer Service",
        items: ["Contact us", "Help center", "Returns & Exchanges", "Trade-In Program", "Sitemap"],
    },
    {
        title: "My Profile",
        items: ["Profile", "Orders", "Returns", "Adresses", "Payment cards", "Wishlist"],
    },
    {
        title: "Follow us on",
        items: ["Facebook", "Instagram", "WhatsApp", "Tiktok", "Threads", "Linkedin", "Telegram"],
    },
    {
        title: "Download our Apps",
        items: ["App Store", "Google Play", "App Gallery"],
    },
]
function Footer() {
    return (
        <footer className="bg-neutral-800 pb-20 pt-12 lg:pb-12 mt-auto">
            <div className='2xl:container mx-auto grid gap-4 px-4'>
                <div className='flex items-center sm:justify-center gap-4 md:gap-10 flex-wrap'>
                    <div className='flex items-center gap-3'>
                        <TfiHelpAlt size={26} color='white' />
                        <div>
                            <p className='text-neutral-400 text-xs'>Visit our Support Center</p>
                            <p className='text-white text-lg'>help.gamershub.com</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <MdOutlineEmail size={26} color='white' />
                        <div>
                            <p className='text-neutral-400 text-xs'>Our Support Email</p>
                            <p className='text-white text-lg'>Support@gamershub.com</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 border-y border-y-neutral-600 py-6">
                    {footerSections.map((section, index) => (
                        <ul key={index}>
                            <li className="font-medium text-white text-lg pb-5 underline underline-offset-8 decoration-orange-400">{section.title}</li>
                            {section.items.map((item, idx) => (
                                <li className='text-neutral-400 hover:text-orange-400' key={idx}>{item}</li>
                            ))}
                        </ul>
                    ))}
                </div>
                <div>
                    <div className='flex items-center justify-center'>
                        <img src="https://cdn.iconscout.com/icon/free/png-512/free-mastercard-icon-download-in-svg-png-gif-file-formats--credit-debit-card-bank-transaction-payment-methods-vol-2-pack-business-icons-32303.png?f=webp&w=60" alt="" />
                        <img src="https://cdn.iconscout.com/icon/free/png-512/free-visa-icon-download-in-svg-png-gif-file-formats--credit-debit-card-bank-payment-methods-vol-2-pack-business-icons-32293.png?f=webp&w=60" alt="" />
                        <img src="https://cdn.iconscout.com/icon/free/png-512/free-paypal-icon-download-in-svg-png-gif-file-formats--logo-credit-debit-card-bank-payment-methods-vol-2-pack-business-icons-32301.png?f=webp&w=60" alt="" />
                        <img src="https://cdn.iconscout.com/icon/free/png-512/free-ebay-icon-download-in-svg-png-gif-file-formats--credit-debit-card-payment-methods-vol-2-pack-business-icons-32281.png?f=webp&w=60" alt="" />
                    </div>
                    <div className='text-center text-sm text-neutral-400'>
                        Copyright &copy; <Link to="/">Gamers Hub</Link> all rights reserved.
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer
