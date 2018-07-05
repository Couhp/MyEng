from random import randint

name = "topic4"

def gen_option () :
    lines = open(name,'r').read().split("\n")
    dictionary = {}
    for line in lines :
        if len(line) > 1 :
            key, val = line.split(":")
            dictionary[key] = val
    keys = list(dictionary.keys())
    length = len(keys) - 1

    def gen_rand(index, length) :
        while True :
            this = randint(1, length-1)
            if this != index : return this

    def gen_question(index) :
        true_ans = randint(1,4)
        question = "The meaning of word \'" + keys[index] + "' : \n"
        option = ""
        for i in range(1,5) :
            if i == true_ans :
                option += dictionary[keys[index]]
            else :
                random_index = gen_rand(index, length)
                option += dictionary[keys[random_index]].rstrip() 
            if i < 4 :
                option += "$"
        option += "\n" + str(true_ans - 1) + "\n"
        return question + option
    
    def gen_fill_question(index) :
    
        question = "Từ sau trong tiếng anh là : \'" + dictionary[keys[index]] + "' : \n" + \
                     keys[index] + "\n"
        return question 

    with open(name + ".opt",'a') as fout :
        for i in range(1,12) :
            fout.write( gen_question(i))
    with open(name + ".fil",'a') as fout :
        for i in range(1,8) :
            fout.write(gen_fill_question(i))

answer = ""
def gen_fill () :
    global answer
    lines = open('dictionary','r').read().split("\n")
    dictionary = {}
    for line in lines :
        print(line.split())
        key, val = line.split()
        dictionary[key] = val.rstrip()
    
    
    def gen_ans (list_token, index, seq) :
        global answer
        list_option = []
        token = list_token[index]
        if token in dictionary :
            list_option = dictionary[token].split(",")
        else :
            print ("ERROR lose word : " + token)
        
        for option in list_option :
            if index < len(list_token) - 1 :
                gen_ans (list_token, index + 1, seq + option + " ")
            else :
                answer += "$" + seq + option
        return

    questions = open('fill_question','r').readlines()
    with open(name +'.fil','a') as fout :
        for question in questions :
            tokens = question.split()
            question = "Translate into Vietnamese : " + question
            gen_ans(tokens, 0, "")
            answer_out = answer.replace("_"," ").replace("   "," ").replace("  "," ")
            fout.write(question.rstrip() + "\n" + answer_out + "\n")
            answer = ""
        
gen_option()
gen_fill()