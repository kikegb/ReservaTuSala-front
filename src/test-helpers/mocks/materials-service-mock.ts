import { of } from "rxjs";5
import { Material } from "src/app/global/interfaces/material.interface";
import { Room } from "src/app/global/interfaces/room.interface";

const materialsList = [
  {
      "id": 1,
      "material": "Chairs",
      "quantity": 5
  },
  {
    "id": 2,
    "material": "whiteboard",
    "quantity": 1
  }
];

export const MaterialsServiceMock = {

    getMaterials: () => {
      return of(materialsList);
    },

    addMaterial: (material: Material) => {
        return of(material as Material);
    },

    updateMaterial: (material: Material) => {
      return of(material as Material);
    },

    deleteMaterial: (id: number) => {
      return of([]);
    }
  }