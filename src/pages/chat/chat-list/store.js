// stores/snackbarStore.js
import { defineStore } from 'pinia'
import apiClient from '@/services/axios'
import { useUserStore } from '@/pages/user-account/store'

export const useChatListStore = defineStore('chatListStore', {
  state: () => ({
    chats: [
       
      ],
    users:[],
    userStore: useUserStore()
  }),

  actions: {
   
    setChatList(chats){
        console.log("Set ChatList called")
        console.log(chats)
        this.chats = chats
    },
    async getChatList(){
      try {
        // this.getUsers()
        console.log("get chatlist")
        let userId = this.userStore.user.userId
        console.log(userId)
              
        const response = await apiClient.get(`/message/chat-room?userId=${userId}`);
        console.log("After chal list api call")
        console.log(response.data)
        if(!response.data.error){
          // const chats = response.data.for
          const formattedMessages = [];
         
          // Using forEach to map recipient details
          // response.data.forEach(message => {
            
          //   // console.log(this.users)
          //   // Find the recipient details based on recipientId
           
          //   // const recipient = this.users.find(user => user.userId == message.recipientId);
          //   // console.log(message)
          //   // If recipient is found, format the message
          //   // if (recipient) {
          //     formattedMessages.push({
          //       ...recipient,
          //       fullName: message.fullName, // Recipient's name

          //       lastMessage: message.lastMessage, // The message content
          //       // timestamp: message.updatedAt.split("T")[0]+ '\t' + message.updatedAt.split("T")[1], // Formatting timestamp
          //       isRead: false, // Assuming unread status; adapt as needed
          //       avatar: this.userInitials(recipient.firstName, recipient.lastName), // Recipient's avatar
          //       chatRoomId: message.chatRoomId
          //     });
          //     // }
          //   });
            // console.log(formattedMessages)
            // formattedMessages = response.data.map(message =>{
            //   return {
            //     ...message,
            //     fullName: message.CreatedBy, // Recipient's name

            //     lastMessage: message.lastMessage, // The message content
            //     // timestamp: message.updatedAt.split("T")[0]+ '\t' + message.updatedAt.split("T")[1], // Formatting timestamp
            //     isRead: false, // Assuming unread status; adapt as needed
            //     avatar: this.userInitials(message.firstName, message.lastName), // Recipient's avatar
            //     chatRoomId: message.chatRoomId
            //   }
            // })
            console.log("Format Messages in Chat List==================")
            console.log(formattedMessages)
           this.setChatList(response.data)

        }      
               
      }catch (error) {
        console.log('Error fetching data:', error);
        // console.log(error)
       
      }

    },  
    async getUsers(){
      try {
          
        const url = `/user?isPublic=${true}`
        const response = await apiClient.get(url);
        console.log(response.data)
        if(response.data.error){
            // snackbarStore.showSnackbar({
            //     message: this.data.error,
            //     color: 'success',
            //     timeout: 3000
            //   })

        }else{
            // snackbarStore.showSnackbar({
            //     message: 'Hello, this is a reusable snackbar!',
            //     color: 'success',
            //     timeout: 3000

            //   })
            const mappedContacts = response.data.map(contact =>{
              const { firstName,middleName, lastName, ...rest } = contact; // Destructure to exclude firstName and lastName
          return {
            ...rest, // Spread remaining keys
            firstName:firstName,
            middleName:middleName,
            lastName: lastName,
            fullName: `${firstName} ${middleName} ${lastName}` // Add fullName
          };
        });
              this.users = mappedContacts

              // console.log(this.users)
        }
        
        // console.log(response.data)
      } catch (error) {
        // console.log('Error fetching data:', error);
       
      }
    },

    userInitials(fullName) {
      const nameParts = fullName.trim().split(' ');

    // Ensure there are at least two parts (Given Name and Surname)
    
        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1];
        return firstName[0].toUpperCase() + lastName[0].toUpperCase();
    
      
    },
    
  },

})
