export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export interface User {
    id: string;
    organization: string;
    username: string;
    email: string;
    phoneNumber: string;
    dateJoined: string;
    status: UserStatus;
    profile: {
        firstName: string;
        lastName: string;
        bvn: string;
        gender: string;
        maritalStatus: string;
        children: string;
        typeOfResidence: string;
    };
    educationAndEmployment: {
        level: string;
        employmentStatus: string;
        sector: string;
        duration: string;
        officeEmail: string;
        monthlyIncome: string[];
        loanRepayment: string;
    };
    socials: {
        twitter: string;
        facebook: string;
        instagram: string;
    };
    guarantor: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        relationship: string;
    };
    personalIncome: string; // isolated account balance for top-level presentation
}
