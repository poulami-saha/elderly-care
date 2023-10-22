export interface User {
    userId: string;
    isCaregiver: boolean;
    id?: string;
}

export interface DocumentModel {
    id?: string;
    documents: string[],
}
export interface CaregiverListModel {
    id?: string;
    caregiverList: string[],
    lastCaregiver?: undefined | UserDataModel,
}
export interface PendingRequestsModel {
    id?: string;
    pendingRequests: undefined | string[],
}

export interface AddCaregiverRequestModel extends CaregiverListModel, PendingRequestsModel {

}
export interface DocumentModel {
    id?: string;
    documents: string[],
}

export interface PersonalDetailModel {
    id?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: Date;
}

export interface ContactDetailModel {
    id?: string;
    address1?: string,
    address2?: string,
    city?: string,
    country?: string,
    email?: string,
    phone?: number,
    pin?: number,
    emergencyContactName?: string;
    emergencyContactEmail?: string;
    emergencyContactPhone?: number;
}

export interface RequirementModel {
    id?: string;
    nightCare?: string;
    accommodation?: string;
    fullTime?: string;
    disorders?: string[];
    languages?: string[];
    insurance?: string;
}

export interface ServiceModel {
    id?: string;
    nightCare: string;
    accommodation: string;
    fullTime: string;
}

export interface ExpertiseModel {
    id?: string;
    years: string;
    languages: string[];
    disorders: string[];
}

export interface UserDataModel extends User {
    personal?: PersonalDetailModel,
    contact?: ContactDetailModel,
    expertise?: ExpertiseModel
    requirement?: RequirementModel,
    documents?: DocumentModel,
    service?: ServiceModel,
    caregiverList?: CaregiverListModel,
    pendingRequests?: PendingRequestsModel,
}

