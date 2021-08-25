const scrollToBottom = (id: string): void => {
    const div = document.getElementById(id);
    if (div) div.scrollTop = div.scrollHeight - div.clientHeight;
};
export default scrollToBottom;
