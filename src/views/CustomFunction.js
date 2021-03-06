export const date2Thai = (srcDate, isFullMonth = false, isTime = false) => {
  if (!srcDate) return srcDate;
  const date = new Date(srcDate);
  const isValidDate = Boolean(+date);
  if (!isValidDate) return srcDate;
  if (isValidDate && date.getFullYear() < 1000) return srcDate;
  const fullMonthThai = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  const abbrMonthThai = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];
  let dstYear = 0;
  if (date.getFullYear() > 2500) {
    dstYear = parseInt(date.getFullYear());
  } else {
    dstYear = parseInt(date.getFullYear() + 543);
  }
  let dstMonth = "";
  if (isFullMonth) {
    dstMonth = fullMonthThai[date.getMonth()];
  } else {
    dstMonth = abbrMonthThai[date.getMonth()];
  }
  let dstTime = "";
  if (isTime) {
    const H =
      date.getHours().toString().length === 1
        ? "0" + date.getHours()
        : date.getHours();
    const M =
      date.getMinutes().toString().length === 1
        ? "0" + date.getMinutes()
        : date.getMinutes();
    dstTime = " " + H + ":" + M + " น.";
  }
  const dsDays =
    date.getDate().toString().length === 1
      ? "0" + date.getDate()
      : date.getDate();
  return dsDays + " " + dstMonth + " " + dstYear + dstTime;
};
