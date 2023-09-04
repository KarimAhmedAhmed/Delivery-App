import { Collection } from 'mongodb';
import { client } from '../../config/database.config';

class UserRepository {
    private collection: Collection<User>;

    constructor() {
        this.collection = client.db('delivery-db').collection('users');
    }

 
    // Add more CRUD methods as needed
}

export default UserRepository;
