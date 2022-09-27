const createShortString = (str: string) => {
    if (str != undefined) {
        return str.length < 5 ? str : str.substring(0, 20) + '...'
    }
}

const parseDateStamp = (created_at: string) => {
    const dateOptions: any = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' };
    const myDate = new Date(created_at);

    return myDate.toLocaleDateString('en-US', dateOptions);
}
export {createShortString, parseDateStamp}