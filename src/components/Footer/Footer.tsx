export const Footer = () => {
    return (
        <footer className='flex flex-col justify-center md:flex-row md:justify-between h-[100px] items-center'>
            <div>
                <img
                    className='w-[150px] block m-auto md:m-0'
                    src='/logo-footer.png'
                    alt=''
                />
            </div>
            <p className='text-zinc-500 text-center md:text-right'>
                Projetado e desenvolvido por{" "}
                <a href='#' className='underline'>
                    Jesse Rodrigues
                </a>
                .{" "}
            </p>
        </footer>
    );
};
