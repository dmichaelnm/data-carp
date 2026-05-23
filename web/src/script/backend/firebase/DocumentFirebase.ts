import { EDocumentType, IDocument } from 'src/script/backend/api/IDocument';
import { IDocumentData } from 'src/script/backend/api/IDocumentData';
import { FirebaseError } from 'firebase/app';
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { firebaseAuth, firebaseStore } from 'boot/firebase';

export abstract class DocumentFirebase<D extends IDocumentData>
  implements IDocument<D>
{
  id: string;
  type: EDocumentType;
  data: D;
  isNew: boolean;

  static async get<D extends IDocumentData, R extends IDocument<D>>(
    id: string,
    type: EDocumentType,
    creator: (data: D) => R,
    documentExpected: boolean
  ): Promise<R | undefined> {
    const docRef = doc(firebaseStore, type, id);
    const document = await getDoc(docRef);
    if (!document.exists()) {
      if (documentExpected) {
        throw new FirebaseError(
          'firestore/document-not-found',
          `The document with ID "${id}" does not exist (firestore/document-not-found).`
        );
      }
      return undefined;
    }
    const data = document.data() as D;
    return creator(data);
  }

  constructor(id: string, type: EDocumentType, data: D, isNew: boolean) {
    this.id = id;
    this.type = type;
    this.data = data;
    this.isNew = isNew;
  }

  async onBeforeSave(): Promise<void> {}

  async save(): Promise<void> {
    if (this.isNew) {
      this.data.meta = {
        created: {
          by: firebaseAuth.currentUser?.displayName ?? 'Unknown',
          at: new Date(Date.now()),
        },
      };
      await this.onBeforeSave();
      if (this.id === '') {
        const coll = collection(firebaseStore, this.type);
        const docRef = await addDoc(coll, this.data);
        this.id = docRef.id;
      } else {
        const docRef = doc(firebaseStore, this.type, this.id);
        await setDoc(docRef, this.data);
      }
      this.isNew = false;
    } else {
      this.data.meta!.altered = {
        by: firebaseAuth.currentUser?.displayName ?? 'Unknown',
        at: new Date(Date.now()),
      };
      const docRef = doc(firebaseStore, this.type, this.id);
      await updateDoc(docRef, this.data as DocumentData);
    }
  }
}
