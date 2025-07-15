let lastId = 0;
export const UniqueComponentId = (prefix = 'stimulsoft_id_'): string => `${prefix}${++lastId}`;
