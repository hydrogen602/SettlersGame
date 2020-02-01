
.PHONY = all clean run

all: ${SRCS}
	tsc

#all: ${JSFILES}

run:
	@echo "Running localhost page server..."
	@servePage .

clean:
	@echo "Cleaning up..."
	rm -f built/*.js built/*.js.map
