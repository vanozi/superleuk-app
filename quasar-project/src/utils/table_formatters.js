export function machineNameFormatter(naam) {
  return naam.data.work_number + " - " + naam.data.work_name;
}

export function brandModelNameFormatter(naam) {
  return naam.data.brand_name + " - " + naam.data.type_name;
}

export function dateTimeFormatter(dateTimeString) {
  return dateTimeString.value.split("+")[0];
}

export function meterFormatter(meterStand) {
  if (meterStand.data.meter_type === null) {
    return "n.v.t.";
  } else if (meterStand.data.meter_type === "h") {
    return meterStand.data.meter + " " + meterStand.data.meter_type;
  } else if (meterStand.data.meter_type === "km") {
    return meterStand.data.meter + " " + meterStand.data.meter_type;
  }
}
