import { QueryClient } from "@tanstack/react-query";
import { Firestore, addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { AddCaregiverRequestModel, CaregiverListModel, ContactDetailModel, DocumentModel, ExpertiseModel, PendingRequestsModel, PersonalDetailModel, RequirementModel, ServiceModel, User, UserDataModel, } from "../model/user";
import { getFirestoreDetails } from "../firebase.config";

export const queryClient = new QueryClient();

export async function addNewUser(user: User) {
    const dbDetails = getFirestoreDetails();
    if (dbDetails === undefined) {
        return;
    }
    try {
        await addDoc(collection(dbDetails, "users"), {
            id: user.userId,
            isCaregiver: user.isCaregiver,
        });
    } catch (error) {
        const err = new Error("An error occurred while adding the new user");
        throw err;
    }
}

export async function fetchCurrentUser(userId: string): Promise<UserDataModel | undefined> {
    const dbDetails = getFirestoreDetails();
    if (dbDetails === undefined || userId === "") {
        return undefined;
    }
    try {
        const queryConstraints = []
        queryConstraints.push(where("id", "==", userId));
        const q = query(collection(dbDetails, 'users'), ...queryConstraints);
        const querySnapshot = await getDocs(q);
        const doc = querySnapshot.docs[0];
        const documentDetails: DocumentModel = {
            documents: doc.data().documents ?? []
        }
        const pendingDetails: PendingRequestsModel = {
            pendingRequests: doc.data().pendingRequests ?? [],
        }
        const caregiverListDetails: CaregiverListModel = {
            caregiverList: doc.data().caregiverList ?? [],
        }
        const personalDetails: PersonalDetailModel = {
            firstName: doc.data().personal?.firstName,
            lastName: doc.data().personal?.lastName,
            gender: doc.data().personal?.gender,
            dateOfBirth: doc.data().personal?.dateOfBirth,
        }
        const contactDetails: ContactDetailModel = {
            address1: doc.data().contact?.address1,
            address2: doc.data().contact?.address2,
            city: doc.data().contact?.city,
            country: doc.data().contact?.country,
            email: doc.data().contact?.email,
            phone: doc.data().contact?.phone,
            pin: doc.data().contact?.pin,
            emergencyContactEmail: doc.data().contact?.emergencyContactEmail,
            emergencyContactName: doc.data().contact?.emergencyContactName,
            emergencyContactPhone: doc.data().contact?.emergencyContactPhone,

        }
        const expertiseDetails: ExpertiseModel = {
            years: doc.data().expertise?.years,
            languages: doc.data().expertise?.languages,
            disorders: doc.data().expertise?.disorders,
        }
        const requirementDetails: RequirementModel = {
            nightCare: doc.data().requirement?.nightCare,
            accommodation: doc.data().requirement?.accommodation,
            fullTime: doc.data().requirement?.fullTime,
            disorders: doc.data().requirement?.disorders,
            languages: doc.data().requirement?.languages,
            insurance: doc.data().requirement?.insurance,
        }
        const serviceDetails: ServiceModel = {
            nightCare: doc.data().service?.nightCare,
            accommodation: doc.data().service?.accommodation,
            fullTime: doc.data().service?.fullTime,
        }
        const user: UserDataModel = {
            id: doc.id,
            userId: userId,
            isCaregiver: doc.data().isCaregiver,
            personal: personalDetails,
            contact: contactDetails,
            expertise: expertiseDetails,
            requirement: requirementDetails,
            documents: documentDetails,
            service: serviceDetails,
            caregiverList: caregiverListDetails,
            pendingRequests: { pendingRequests: pendingDetails.pendingRequests },
        };

        return user;

    } catch (error) {
        const err = new Error("An error occurred while fetching the Current user details");
        throw err;
    }
}
export async function updateCurrentUserPersonalData(data: PersonalDetailModel) {
    const dbDetails = getFirestoreDetails();
    if (dbDetails === undefined || data.id === undefined) {
        return;
    }
    try {
        await updateDoc(doc(dbDetails, "users", data.id),
            {
                "personal.firstName": data.firstName,
                "personal.lastName": data.lastName,
                "personal.gender": data.gender,
                "personal.dateOfBirth": data.dateOfBirth,
            }
        );
    } catch (error) {
        const err = new Error("An error occurred while adding the personal details");
        throw err;
    }
}
export async function updateCurrentUserContactData(data: ContactDetailModel) {
    const dbDetails = getFirestoreDetails();
    if (dbDetails === undefined || data.id === undefined) {
        return;
    }
    try {
        await updateDoc(doc(dbDetails, "users", data.id),
            {
                "contact.address1": data.address1,
                "contact.address2": data.address2,
                "contact.city": data.city,
                "contact.country": data.country,
                "contact.pin": data.pin,
                "contact.email": data.email,
                "contact.phone": data.phone,
                "contact.emergencyName": data.emergencyContactName,
                "contact.emergencyEmail": data.emergencyContactEmail,
                "contact.emergencyPhone": data.emergencyContactPhone,
            }
        );
    } catch (error) {
        const err = new Error("An error occurred while adding the contact details");
        throw err;
    }
}
export async function updateCaregiverExpertiseData(data: ExpertiseModel) {
    const dbDetails = getFirestoreDetails();
    if (dbDetails === undefined || data.id === undefined) {
        return;
    }
    try {
        await updateDoc(doc(dbDetails, "users", data.id),
            {
                "expertise.years": data.years,
                "expertise.languages": data.languages,
                "expertise.disorders": data.disorders,
            }
        );
    } catch (error) {
        const err = new Error("An error occurred while adding the expertise");
        throw err;
    }
}
export async function updateCaregiverServiceData(data: ServiceModel) {

    const dbDetails = getFirestoreDetails();
    if (dbDetails === undefined || data.id === undefined) {
        return;
    }
    try {
        await updateDoc(doc(dbDetails, "users", data.id),
            {
                "service.nightCare": data.nightCare,
                "service.accommodation": data.accommodation,
                "service.fullTime": data.fullTime,
            }
        );
    } catch (error) {
        const err = new Error("An error occurred while adding the service details");
        throw err;
    }
}
export async function updateRequirementsData(data: RequirementModel) {

    const dbDetails = getFirestoreDetails();
    if (dbDetails === undefined || data.id === undefined) {
        return;
    }
    try {
        await updateDoc(doc(dbDetails, "users", data.id),
            {
                "requirement.nightCare": data.nightCare,
                "requirement.accommodation": data.accommodation,
                "requirement.time": data.fullTime,
                "requirement.languages": data.languages,
                "requirement.disorders": data.disorders,
                "requirement.insurance": data.insurance,
            }
        );
    } catch (error) {
        const err = new Error("An error occurred while adding the consumption");
        throw err;
    }
}

export async function findCaregiver(userId: string): Promise<UserDataModel[]> {
    const dbDetails: Firestore = getFirestoreDetails();

    if (dbDetails === undefined || userId === "") {
        return [];
    }
    try {
        const user: undefined | UserDataModel = await fetchCurrentUser(userId);
        if (user === undefined) {
            return [];
        }
        const caregivers1 = await firstSearchQuery(dbDetails, user);
        const caregivers2 = await secondSearchQuery(dbDetails, user);
        const commonCaregivers = caregivers1.filter(x => caregivers2.includes(x));
        const getCaregiverProfiles = async () => {
            const data: UserDataModel[] = []
            for (const caregiver of commonCaregivers) {
                let dataUser: undefined | UserDataModel = await fetchCurrentUser(caregiver);
                if (dataUser !== undefined) {
                    data.push(dataUser);
                }
            }
            return data;
        }
        return getCaregiverProfiles();
    } catch (error) {
        const err = new Error("An error occurred while fetching Caregivers of your Requirement. Please provide requirement in Personal details section.");
        throw err;
    }
}

const firstSearchQuery = async (dbDetails: Firestore, user: UserDataModel): Promise<string[]> => {
    let queryConstraints = []
    let caregivers: string[] = [];
    queryConstraints.push(where("service.nightCare", "==", user?.requirement?.nightCare));
    queryConstraints.push(where("service.accommodation", "==", user?.requirement?.accommodation));
    //queryConstraints.push(where("service.time", "==", user?.requirement?.fullTime));
    if (user?.requirement !== undefined && user.requirement.languages && user.requirement?.languages?.length > 0) {
        queryConstraints.push(where("expertise.languages", 'array-contains-any', user.requirement.languages));
    }

    const q = query(collection(dbDetails, 'users'), ...queryConstraints);
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map(async (doc) => {
        caregivers.push(doc.data().id);
    })
    return caregivers;
}
const secondSearchQuery = async (dbDetails: Firestore, user: UserDataModel): Promise<string[]> => {
    let queryConstraints = []
    let caregivers: string[] = [];
    queryConstraints.push(where("service.nightCare", "==", user?.requirement?.nightCare));
    queryConstraints.push(where("service.accommodation", "==", user?.requirement?.accommodation));
    //queryConstraints.push(where("service.time", "==", user?.requirement?.fullTime));
    if (user?.requirement !== undefined && user.requirement.languages && user.requirement.languages.length > 0) {
        queryConstraints.push(where("expertise.disorders", 'array-contains-any', user.requirement.disorders));
    }

    const q = query(collection(dbDetails, 'users'), ...queryConstraints);
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map(async (doc) => {
        caregivers.push(doc.data().id);
    })
    return caregivers;
}

export async function updateDocumentsNameList(data: DocumentModel) {
    const dbDetails = getFirestoreDetails();
    if (dbDetails === undefined || data.id === undefined) {
        return;
    }
    try {
        await updateDoc(doc(dbDetails, "users", data.id),
            {
                "documents": data.documents,
            }
        );
    } catch (error) {
        const err = new Error("An error occurred while adding the documents");
        throw err;
    }
}

export async function addCaregiverRequest(data: AddCaregiverRequestModel) {
    const dbDetails: Firestore = getFirestoreDetails();
    if (dbDetails === undefined || data.id === undefined) {
        return;
    }
    try {
        await updateDoc(doc(dbDetails, "users", data.id),
            {
                "caregiverList": data.caregiverList,
            }
        );
        if (data.lastCaregiver?.id) {
            await updateDoc(doc(dbDetails, "users", data.lastCaregiver.id),
                {
                    "pendingRequests": data.pendingRequests,
                }
            );
        }
    } catch (error) {
        const err = new Error("An error occurred while adding a new caregiver request");
        throw err;
    }
}

export async function approveRequest(data: AddCaregiverRequestModel) {
    const dbDetails: Firestore = getFirestoreDetails();
    if (dbDetails === undefined || data.id === undefined) {
        return;
    }
    try {
        await updateDoc(doc(dbDetails, "users", data.id),
            {
                "pendingRequests": data.pendingRequests,
            }
        );
    } catch (error) {
        const err = new Error("An error occurred while approving a request.");
        throw err;
    }
}

export async function getPatientProfile(docId: string): Promise<undefined | UserDataModel> {
    const dbDetails: Firestore = getFirestoreDetails();
    if (dbDetails === undefined || docId === undefined) {
        return;
    }
    try {
        const q = query(collection(dbDetails, 'users'));
        const querySnapshot = await getDocs(q);
        const profile = querySnapshot.docs.find(doc => doc.id === docId);
        if (profile) {
            const id = profile.data().id;
            return await fetchCurrentUser(id);
        }
        return undefined;

    } catch (error) {
        const err = new Error("An error occurred while fetching a patient profile");
        throw err;
    }
}