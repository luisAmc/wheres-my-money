/**
 * @generated SignedSource<<e9fa2f3bd3a7caa219e08ace693ab9c9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type NewTransactionInput = {
  amount: number;
  category: string;
  date: any;
  notes: string;
  type: string;
};
export type NewIncomeMutation$variables = {
  input: NewTransactionInput;
};
export type NewIncomeMutationVariables = NewIncomeMutation$variables;
export type NewIncomeMutation$data = {
  readonly newTransaction: {
    readonly id: string;
    readonly date: any;
    readonly amount: number;
    readonly notes: string | null;
    readonly type: string;
    readonly category: string;
  };
};
export type NewIncomeMutationResponse = NewIncomeMutation$data;
export type NewIncomeMutation = {
  variables: NewIncomeMutationVariables;
  response: NewIncomeMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Transaction",
    "kind": "LinkedField",
    "name": "newTransaction",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "date",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "amount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "notes",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "type",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "category",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NewIncomeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewIncomeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d9c1f35c76528cd16f7ecc7a6792f50b",
    "id": null,
    "metadata": {},
    "name": "NewIncomeMutation",
    "operationKind": "mutation",
    "text": "mutation NewIncomeMutation(\n  $input: NewTransactionInput!\n) {\n  newTransaction(input: $input) {\n    id\n    date\n    amount\n    notes\n    type\n    category\n  }\n}\n"
  }
};
})();

(node as any).hash = "c736b0a9c7eb10945b68f81f655cbebb";

export default node;
