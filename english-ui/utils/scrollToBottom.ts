const scrollToBottom = (id: string) => {
    const div = document.getElementById(id);
    if (div) div.scrollTop = div.scrollHeight - div.clientHeight;
};
export default scrollToBottom;
