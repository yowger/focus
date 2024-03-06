import type { IPhoto } from "../types/photoTypes"

interface IPhotoListProps {
    photos: IPhoto[]
}

export default function PhotoList({ photos }: IPhotoListProps) {
    return (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {photos.map((photo) => {
                return (
                    <div
                        key={photo.id}
                        className="relative cursor-pointer group bg-slate-50"
                    >
                        <img
                            src={photo.src.large}
                            alt={photo.alt}
                            className="object-cover object-center w-full aspect-[4/3] max-w-full rounded-sm"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 via-transparent to-slate-800/20 opacity-0 group-hover:opacity-100 duration-150 rounded-sm"></div>
                    </div>
                )
            })}
        </section>
    )
}
