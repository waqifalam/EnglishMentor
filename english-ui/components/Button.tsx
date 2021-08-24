const Button = ({ children, onClick, text }) => {
    return (
        <div className="p-2 md:w-40 ">
                <a onClick={onClick} className="flex items-center p-4 bg-blue-200 rounded-lg shadow-xs cursor-pointer hover:bg-blue-500 hover:text-gray-100">
                    {children}
                    <div>
                        <p className=" text-xs font-medium ml-2 ">
                            {text}
                        </p>
                    </div>
                </a>
            </div>
    )
}
export default Button;
