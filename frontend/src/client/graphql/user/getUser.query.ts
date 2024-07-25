import { gql } from "@apollo/client";

export default gql`
    query getUser($accessToken: String!) {
        getUser(accessToken: $accessToken) {
            id
            email
            username
            role
            active
        }
    }
`