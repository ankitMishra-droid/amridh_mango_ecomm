import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
    ChevronRight, Calendar, MapPin, Clock, Users, X,
    ChevronLeft, ZoomIn, Leaf, Star, ArrowRight
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────
interface GalleryImage {
    src: string;
    caption: string;
}

interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    attendees: string;
    category: string;
    badge: string;
    description: string;
    highlights: string[];
    gallery: GalleryImage[];
}

// ─── Mock Data ───────────────────────────────────────────
const events: Event[] = [
    {
        id: 1,
        title: 'Alphonso Mango Harvest Festival 2025',
        date: 'May 15, 2025',
        time: '9:00 AM – 6:00 PM',
        location: 'Ratnagiri, Maharashtra',
        attendees: '500+',
        category: 'Festival',
        badge: 'Upcoming',
        description:
            'Join us at our lush Ratnagiri orchards for the most celebrated mango harvest of the season. Walk through rows of golden Alphonso trees, handpick your own mangoes, and experience the magic of nature firsthand. Live cooking demonstrations, traditional aamras-making sessions, and farm-to-table tastings await you.',
        highlights: [
            'Live orchard tour with expert farmers',
            'Hands-on mango picking experience',
            'Alphonso pulp & aamras tasting',
            'Traditional mango pickle & jam workshop',
            'Kids mango painting corner',
            'Free goodie bag with every entry',
        ],
        gallery: [
            { src: '/images/AdobeStock_43300661.jpeg', caption: 'Golden Alphonso orchards at peak harvest' },
            { src: '/images/pulp.jpeg', caption: 'Live Alphonso pulp demonstration' },
            { src: '/images/juice.jpeg', caption: 'Fresh mango juice served at the festival' },
            { src: '/images/jam.jpeg', caption: 'Mango jam workshop with our master chefs' },
        ],
    },
    {
        id: 2,
        title: 'Wholesale Buyer Meet 2025',
        date: 'June 3, 2025',
        time: '10:00 AM – 4:00 PM',
        location: 'Mumbai, Maharashtra',
        attendees: '150+',
        category: 'Business',
        badge: 'Upcoming',
        description:
            'An exclusive meet for retailers, distributors, and bulk buyers. Discover our full product range — from pure Alphonso pulp and premium jams to pickles and fresh fruit boxes. Get direct access to wholesale pricing, seasonal offers, and custom packaging options. Network with other industry professionals over a lavish mango-themed lunch.',
        highlights: [
            'Exclusive wholesale pricing reveal',
            'Full product range showcase & sampling',
            'Custom packaging consultation',
            'B2B networking lunch',
            'Direct farm supply agreements',
            'Priority booking for next season',
        ],
        gallery: [
            { src: '/images/About-us-Amirdh-Mango-Pulp.webp', caption: 'Premium Alphonso pulp range' },
            { src: '/images/pickle.png', caption: 'Traditional mango pickle lineup' },
            { src: '/images/jam.jpeg', caption: 'Artisan mango jam collection' },
            { src: '/images/image.png', caption: 'Mango cubes & aam papad display' },
            { src: '/images/juice.jpeg', caption: 'Mango beverages showcase' },
            { src: '/images/product-Amirdh-Mango-pulp.webp', caption: 'Export-grade packaging display' },
        ],
    },
    {
        id: 3,
        title: 'Amridh Mango Food Expo',
        date: 'July 20, 2025',
        time: '11:00 AM – 8:00 PM',
        location: 'Pune Exhibition Centre, Pune',
        attendees: '1000+',
        category: 'Expo',
        badge: 'Upcoming',
        description:
            'Amridh takes centre stage at Pune\'s biggest food expo. Experience the full universe of mango products — from farm-fresh Alphonso boxes to our artisanal jams, pickles, pulp, cubes, and juices. Interactive stalls, live cooking shows by celebrity chefs, and a dedicated kids\' mango zone make this a must-visit for every mango lover.',
        highlights: [
            'Celebrity chef live cooking show',
            'Mango product universe on display',
            'Interactive tasting & voting',
            'Exclusive expo-only discounts',
            'Kids\' mango art & craft zone',
            'Photography competition with prizes',
        ],
        gallery: [
            { src: '/images/Product-showcases_image1-27.webp', caption: 'Grand Amridh stall at the expo' },
            //   { src: '/images/cubes-2.jpeg', caption: 'Mango cubes & papad tasting bar' },
            //   { src: '/images/juice-2.jpeg', caption: 'Live mango juice counter' },
            //   { src: '/images/jam-2.jpeg', caption: 'Artisan jam & preserve stall' },
            //   { src: '/images/pickle-2.jpeg', caption: 'Traditional pickle sampling station' },
            //   { src: '/images/pulp-3.jpeg', caption: 'Pure Alphonso pulp showcase' },
        ],
    },
];

// ─── Gallery Lightbox ─────────────────────────────────────
function Lightbox({
    images,
    startIndex,
    onClose,
}: {
    images: GalleryImage[];
    startIndex: number;
    onClose: () => void;
}) {
    const [current, setCurrent] = React.useState(startIndex);

    React.useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') setCurrent(i => (i + 1) % images.length);
            if (e.key === 'ArrowLeft') setCurrent(i => (i - 1 + images.length) % images.length);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [images.length, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={onClose}
        >
            <button
                className="absolute top-5 right-5 text-white bg-white/15 hover:bg-white/25 rounded-full p-2.5 transition-colors z-10"
                onClick={onClose}
            >
                <X className="h-5 w-5" />
            </button>
            <button
                className="absolute left-5 top-1/2 -translate-y-1/2 text-white bg-white/15 hover:bg-white/25 rounded-full p-2.5 z-10"
                onClick={e => { e.stopPropagation(); setCurrent(i => (i - 1 + images.length) % images.length); }}
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white bg-white/15 hover:bg-white/25 rounded-full p-2.5 z-10"
                onClick={e => { e.stopPropagation(); setCurrent(i => (i + 1) % images.length); }}
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            <div className="flex flex-col items-center gap-4 max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                <AnimatePresence mode="wait">
                    <motion.img
                        key={current}
                        src={images[current].src}
                        alt={images[current].caption}
                        className="max-h-[75vh] w-full object-contain rounded-3xl shadow-2xl"
                        initial={{ opacity: 0, scale: 0.93 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                    />
                </AnimatePresence>
                <div className="text-white/80 text-sm font-medium text-center">
                    {images[current].caption}
                    <span className="ml-4 text-white/40">{current + 1} / {images.length}</span>
                </div>
                {/* Thumbnail strip */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === current ? 'border-orange-500' : 'border-white/20 hover:border-orange-300 opacity-60 hover:opacity-100'
                                }`}
                        >
                            <img src={img.src} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// ─── Event Card ───────────────────────────────────────────
function EventCard({ event, onClick }: { event: Event; onClick: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            onClick={onClick}
        >
            {/* Cover image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={event.gallery[0].src}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-orange-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                        {event.category}
                    </span>
                    <span className="bg-emerald-500 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                        {event.badge}
                    </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-black text-xl leading-tight drop-shadow">{event.title}</p>
                </div>
            </div>

            {/* Details */}
            <div className="p-6">
                <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar className="h-4 w-4 text-orange-500 flex-shrink-0" />
                        <span className="font-semibold">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Clock className="h-4 w-4 text-orange-500 flex-shrink-0" />
                        <span className="font-semibold">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />
                        <span className="font-semibold truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Users className="h-4 w-4 text-orange-500 flex-shrink-0" />
                        <span className="font-semibold">{event.attendees} attendees</span>
                    </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-5">{event.description}</p>
                <div className="flex items-center text-orange-600 font-bold text-sm group-hover:gap-2 transition-all gap-1">
                    View Details <ArrowRight className="h-4 w-4" />
                </div>
            </div>
        </motion.div>
    );
}

// ─── Event Detail Modal ───────────────────────────────────
function EventModal({ event, onClose }: { event: Event; onClose: () => void }) {
    const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <>
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        images={event.gallery}
                        startIndex={lightboxIndex}
                        onClose={() => setLightboxIndex(null)}
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl max-w-4xl w-full my-8"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Hero */}
                    <div className="relative h-72 sm:h-96">
                        <img
                            src={event.gallery[0].src}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2.5 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex gap-2 mb-3">
                                <span className="bg-orange-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                                    {event.category}
                                </span>
                                <span className="bg-emerald-500 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                                    {event.badge}
                                </span>
                            </div>
                            <h2 className="text-white font-black text-2xl sm:text-3xl leading-tight drop-shadow-lg">
                                {event.title}
                            </h2>
                        </div>
                    </div>

                    <div className="p-6 sm:p-10">
                        {/* Meta info */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            {[
                                { icon: Calendar, label: 'Date', value: event.date },
                                { icon: Clock, label: 'Time', value: event.time },
                                { icon: MapPin, label: 'Venue', value: event.location },
                                { icon: Users, label: 'Attendees', value: event.attendees },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex flex-col items-center text-center p-4 bg-orange-50 rounded-2xl">
                                    <Icon className="h-5 w-5 text-orange-600 mb-1" />
                                    <span className="text-orange-600 text-xs font-black uppercase tracking-wider">{label}</span>
                                    <span className="text-gray-900 font-bold text-sm mt-0.5">{value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-xl font-black text-gray-900 mb-3">About This Event</h3>
                            <p className="text-gray-600 leading-relaxed">{event.description}</p>
                        </div>

                        {/* Highlights */}
                        <div className="mb-10">
                            <h3 className="text-xl font-black text-gray-900 mb-4">Event Highlights</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {event.highlights.map((h, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                                        <div className="flex-shrink-0 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                                            <Star className="h-3 w-3 text-white fill-current" />
                                        </div>
                                        <span className="text-gray-700 font-semibold text-sm">{h}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gallery */}
                        <div className="mb-8">
                            <h3 className="text-xl font-black text-gray-900 mb-4">Event Gallery</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {event.gallery.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setLightboxIndex(i)}
                                        className="relative aspect-square rounded-2xl overflow-hidden group focus:outline-none"
                                    >
                                        <img
                                            src={img.src}
                                            alt={img.caption}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                                            <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-orange-900/20 flex items-center justify-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Register for Event
                            </button>
                            <button className="flex-1 border-2 border-gray-200 hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Get Directions
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}

// ─── Main Events Page ─────────────────────────────────────
export default function Events() {
    const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
    const [filter, setFilter] = React.useState<string>('All');

    const categories = ['All', ...Array.from(new Set(events.map(e => e.category)))];
    const filtered = filter === 'All' ? events : events.filter(e => e.category === filter);

    return (
        <div className="pb-24">
            <AnimatePresence>
                {selectedEvent && (
                    <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
                )}
            </AnimatePresence>

            {/* ── Hero Banner ── */}
            <div className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400 overflow-hidden">
                {/* decorative blobs */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-amber-300/20 rounded-full blur-2xl" />
                <section className="relative h-[50vh] flex items-center overflow-hidden bg-orange-600">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute inset-0 bg-[repeating-conic-gradient(from_0deg,transparent_0deg_10deg,rgba(255,255,255,0.1)_10deg_20deg)]" />
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black mb-6"
                        >
                            Mango Moments <span className="text-yellow-300">Worth Celebrating</span>
                        </motion.h1>
                        <p className="text-xl text-orange-50 max-w-3xl mx-auto leading-relaxed">
                            From orchard harvest festivals to exclusive wholesale meets — join us for unforgettable experiences celebrating India's finest Alphonso mangoes.
                        </p>

                        {/* ── Breadcrumbs ── */}
                        <div className="bg-transparent">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                                    <Link to="/" className="hover:text-gray-600 text-white">Home</Link>
                                    <ChevronRight className="h-4 w-4 text-white" />
                                    <span className="text-gray-900 font-medium text-white">Events</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* ── Filter tabs ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-3 mb-12"
                >
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${filter === cat
                                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-300 hover:text-orange-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* ── Event Cards Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {filtered.map(event => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onClick={() => setSelectedEvent(event)}
                        />
                    ))}
                </div>

                {/* ── Past Events Gallery Strip ── */}
                <div className="mt-4">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <span className="text-orange-600 font-black uppercase tracking-widest text-sm block mb-1">Memories</span>
                            <h2 className="text-3xl font-black text-gray-900">From Past Events</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {[
                            '/images/Product-showcases_image1-11.webp',
                            '/images/Product-showcases_image1-22.webp',
                            '/images/Product-showcases_image1-27.webp',
                            '/images/Product-showcases_image1-71.webp',
                            '/images/About-us-Amirdh-Mango-Pulp.webp',
                            '/images/image.png',
                        ].map((src, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className="aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                            >
                                <img
                                    src={src}
                                    alt={`Past event ${i + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── Newsletter / Stay Updated ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-100 rounded-[2.5rem] p-10 sm:p-14 text-center"
                >
                    <Leaf className="h-8 w-8 text-orange-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-black text-gray-900 mb-3">Never Miss an Event</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Get early access to registrations, exclusive invites, and mango season updates straight to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none font-medium text-gray-900 bg-white"
                        />
                        <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-orange-200 whitespace-nowrap">
                            Notify Me
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}