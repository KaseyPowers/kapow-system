import { AttributeLocation, AttributeType, AttributePartShorthand, AttributeObj } from "./attribute_types";

// create the description object to use
// remove the required parts to calculate later, and add make sure other comparable values are made optional
type OptionalDescriptionKeys = "parts" | "shorthand";
type DescriptionObjType = Omit<AttributeObj, OptionalDescriptionKeys> & Partial<Pick<AttributeObj, OptionalDescriptionKeys>>;

// define the basic values here
const AttributeDescriptionsByType: Record<AttributeLocation, Record<AttributeType, DescriptionObjType>> = {
    [AttributeLocation.physical]: {
        [AttributeType.power]: { id: "STR", name: "Strength" },
        [AttributeType.finesse]: { id: "AGL", name: "Agility" },
        [AttributeType.awareness]: { id: "DEX", name: "Dexterity" },
        [AttributeType.resilience]: { id: "STM", name: "Stamina" },
    },
    [AttributeLocation.mental]: {
        [AttributeType.power]: { id: "INT", name: "Intelligence" },
        [AttributeType.finesse]: { id: "WIT", name: "Wit" /* Other options: Creativity, Cleverness */, },
        [AttributeType.awareness]: { id: "PER", name: "Perception" },
        [AttributeType.resilience]: { id: "FCS", name: "Focus" },
    },
    [AttributeLocation.social]: {
        [AttributeType.power]: { id: "CONF", name: "Confidence" },
        [AttributeType.finesse]: { id: "CHRM", name: "Charm" },
        [AttributeType.awareness]: { id: "INS", name: "Insight" },
        [AttributeType.resilience]: { id: "WILL", name: "Willpower" },
    },
};

// object of attributes mapped by id
const Attributes: Record<string, AttributeObj> = {};
// mappings for attribute parts to the id's
const AttributesByPartShorthand = new Map<AttributePartShorthand, string>();

const AttributesByPart = Object.values(AttributeLocation).reduce((locOutput, location) => {
    locOutput[location] = Object.values(AttributeType).reduce((typeOutput, type) => {
        const parts: AttributePartShorthand = [location, type];

        const obj = AttributeDescriptionsByType[location][type];
        const id = obj.id;
        Attributes[id] = {
            ...obj,
            shorthand: (obj.shorthand || id).toUpperCase(),
            parts
        };

        AttributesByPartShorthand.set(parts, id);
        typeOutput[type] = id;
        return typeOutput;
    }, {} as Record<AttributeType, string>);
    return locOutput;
}, {} as Record<AttributeLocation, Record<AttributeType, string>>);

export {
    Attributes,
    AttributesByPart,
    AttributesByPartShorthand
};