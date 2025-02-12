let lastId = 0;
export function UniqueComponentId(prefix = 'stimulsoft_id_') {
  lastId++;
  return `${prefix}${lastId}`;
}
