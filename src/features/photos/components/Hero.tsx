import SearchBar from "./SearchBar"

export default function Hero() {
    return (
        <section
            className="flex h-[500px] mb-8 bg-cover bg-neutral-900"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/130879/pexels-photo-130879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            }}
        >
            <div className="max-w-[630px] m-auto">
                <h1 className="text-slate-50 text-3xl font-semibold mb-8">
                    The best free stock photos, royalty free images & videos
                    shared by creators.
                </h1>

                <SearchBar />
            </div>
        </section>
    )
}
