const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    const isCtrlCmd = event.ctrlKey || event.metaKey;

    // اجازه برای کلیدهای جهت‌نما، تب، بک‌اسپیس
    if (["ArrowLeft", "ArrowRight", "Tab", "Backspace"].includes(key) || isCtrlCmd) {
        return;
    }

    // جلوگیری از عملکرد Space
    if (key === " ") {
        event.preventDefault();
        return;
    }

    // چک کردن برای کپی، کات، پیست
    if (isCtrlCmd && ["c", "v", "x"].includes(key.toLowerCase())) {
        return;
    }

    // جلوگیری از وارد کردن حروف و علامت‌های خاص
    if (!/[0-9۰-۹]/.test(key)) {
        event.preventDefault();
    }
};

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    // تبدیل اعداد فارسی به انگلیسی
    const persianToEnglishMap: { [key: string]: string } = {
        "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9"
    };
    newValue = newValue.replace(/[۰-۹]/g, (match) => persianToEnglishMap[match]);

    // بررسی اعتبارسنجی
    if (onValidation && !onValidation(newValue)) {
        return;
    }

    // به‌روزرسانی حالت
    setValue(newValue);

    // فراخوانی onChange از props
    if (onChange) {
        const syntheticEvent = { ...event, target: { ...event.target, value: newValue } } as ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
    }
};