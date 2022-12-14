import { AttributeLocation, attributeLocationValues, AttributeCategory, attributeCategoryValues, Attribute } from "../../types";
import { AttributePartsObj, AttributeDefinition, getAttribute } from "./attribute_definition_types";

// define the basic values here
const AttributeDefinitionsByType: AttributePartsObj<AttributeDefinition> = {
    [AttributeLocation.physical]: {
        [AttributeCategory.power]: { id: "STR", name: "Strength", description: "Test Strength Description, Test Strength Description, Test Strength Description" },
        [AttributeCategory.speed]: { id: "AGL", name: "Agility" },
        [AttributeCategory.awareness]: { id: "DEX", name: "Dexterity" },
        [AttributeCategory.resilience]: { id: "STM", name: "Stamina" },
    },
    [AttributeLocation.mental]: {
        [AttributeCategory.power]: { id: "INT", name: "Intelligence" },
        [AttributeCategory.speed]: { id: "WIT", name: "Wit" /* Other options: Creativity, Cleverness */, },
        [AttributeCategory.awareness]: { id: "PER", name: "Perception" },
        [AttributeCategory.resilience]: { id: "FCS", name: "Focus" },
    },
    [AttributeLocation.social]: {
        [AttributeCategory.power]: { id: "CONF", name: "Confidence" },
        [AttributeCategory.speed]: { id: "CHRM", name: "Charm" },
        [AttributeCategory.awareness]: { id: "INS", name: "Insight" },
        [AttributeCategory.resilience]: { id: "WILL", name: "Willpower" },
    },
};

/** TODO: Attributes total definitions  */
// const categoryDescription = `Attributes are divided into 3 locations (${Object.values(AttributeLocation).join(", ")}), each with 4 aspects (${Object.values(AttributeCategory).join(", ")}).`;

// const mainDescription = "Attributes define latent aptitude, while skills refer to learned abilities.";

// export const AttributesDescription = {
//     category: categoryDescription,
//     mainText: mainDescription,
//     total: [mainDescription, categoryDescription].join(" ")
// };

type AttributeId = Attribute["id"];
// object of attributes mapped by id
const attributes: Attribute[] = [];
const attributesObj: Record<AttributeId, Attribute> = {};
type AttributeIdByPartType = AttributePartsObj<AttributeId>;


const attributeIdByPart: AttributeIdByPartType = attributeLocationValues.reduce((locOutput, location) => {
    locOutput[location] = attributeCategoryValues.reduce((categoryOutput, category) => {
        const definition = AttributeDefinitionsByType[location][category];
        const attribute = getAttribute(definition, location, category);
        const id = attribute.id;
        attributes.push(attribute);
        attributesObj[id] = attribute;
        categoryOutput[category] = id;
        return categoryOutput;
    }, {} as Record<AttributeCategory, AttributeId>);

    return locOutput;
}, {} as AttributeIdByPartType);

export {
    attributes,
    attributesObj,
    attributeIdByPart,
};